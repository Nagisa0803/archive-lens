const characterNames = await fetch("./wardrobe/characters.json").then((r) =>
  r.json(),
);
const wardrobeCatalog = await fetch("./wardrobe/catalog.json").then((r) => {
  if (!r.ok) throw Error("衣装与发型目录加载失败");
  return r.json();
});
import { unzipSync, zipSync, strToU8, strFromU8 } from "./vendor/fflate.js";
const cardCatalog = await fetch("./cards/catalog.json").then((r) => {
  if (!r.ok) throw Error("Card preview catalog unavailable");
  return r.json();
});
const names = {
  ai: "小美山 愛",
  aoi: "井川 葵",
  chs: "白石 千紗",
  hrk: "佐伯 遙子",
  kkr: "赤崎 こころ",
  ktn: "長瀬 琴乃",
  mei: "早坂 芽衣",
  ngs: "伊吹 渚",
  rei: "一ノ瀬 怜",
  rio: "神崎 莉央",
  rui: "天動 瑠依",
  ski: "白石 沙季",
  skr: "川咲 さくら",
  szk: "兵藤 雫",
  suz: "成宮 すず",
  yu: "鈴村 優",
};
let allowOnlinePreviews = true;
export function setOnlinePreviews(value) {
  allowOnlinePreviews = value === true;
  document.dispatchEvent(new CustomEvent("archive-thumbnail-policy-change"));
}
const entries = new Map();
let download = null;
const enc = new TextEncoder();
const counts = [
  "cards",
  "characters",
  "costumes",
  "hairs",
  "decks",
  "deckPositions",
  "items",
  "photos",
  "messages",
  "missions",
  "staffs",
  "photoPoses",
];
function rows(user, k) {
  return Array.isArray(user[k]) ? user[k] : [];
}
function name(cid) {
  return characterNames[cid] || names[String(cid).replace(/^char-/, "")] || cid;
}
function add(snapshot, files = null) {
  const id = crypto.randomUUID().replaceAll("-", "");
  entries.set(id, { snapshot, files, urls: new Map() });
  return summary(id);
}
function summary(id) {
  const s = entries.get(id).snapshot,
    u = s.userData;
  return {
    id,
    name: u.user.name || "未命名帐号",
    scope: s.scope || "Account",
    managerLevel: u.user.managerLevel || 1,
    createdAt: s.createdAt,
    source: s.source || {},
    counts: Object.fromEntries(counts.map((k) => [k, rows(u, k).length])),
    coverage: s.coverage || {},
    fingerprint: s.accountFingerprint.slice(0, 12),
  };
}
function media(entry, file) {
  if (!file) return null;
  if (entry.urls.has(file)) return entry.urls.get(file);
  const bytes = entry.files?.["media/" + file];
  const url = bytes
    ? URL.createObjectURL(
        new Blob([bytes], {
          type: file.endsWith(".png")
            ? "image/png"
            : file.endsWith(".webp")
              ? "image/webp"
              : "image/jpeg",
        }),
      )
    : null;
  entry.urls.set(file, url);
  return url;
}
function wardrobeItem(entry, key, item) {
  const id = item[key === "costumes" ? "costumeId" : "hairId"] || item.id || "",
    definition = wardrobeCatalog[key]?.[id] || {},
    category = key === "hairs" ? definition.category || "unknown" : "costume",
    isDefault = category === "costume-default",
    packed = entry.snapshot.mediaIndex?.[key]?.[id];
  const usablePacked =
    !isDefault &&
    packed?.file &&
    packed.previewKind !== "default-hair-character-reference" &&
    (!packed.assetId || packed.assetId === definition.assetId);
  const url = usablePacked ? media(entry, packed.file) : null;
  const image = isDefault
    ? null
    : url
      ? { ...packed, url }
      : allowOnlinePreviews && definition.image
        ? { ...definition.image, url: "/" + definition.image.file }
        : null;
  const linkedCostumes = (definition.defaultForCostumeIds || []).map((cid) => ({
    id: cid,
    ...wardrobeCatalog.costumes[cid],
  }));
  return {
    ...item,
    id,
    category,
    displayName: isDefault ? "衣装默认发型" : definition.name || id,
    variantName: definition.name || "",
    previewKind: isDefault
      ? "costume-default-no-independent-preview"
      : "native-thumbnail",
    previewNote: isDefault
      ? "这是对应衣装的默认发型记录，不计作额外发型。当前没有独立发型预览图，不使用人物头像替代。"
      : "",
    characterId: definition.characterId || "",
    characterName: name(definition.characterId || ""),
    linkedCostumes,
    image,
    equipped: rows(entry.snapshot.userData, "characters").some(
      (c) => c.costumeId === id || c.hairId === id,
    ),
  };
}

function safePhotoURL(value) {
  if (typeof value !== "string") return null;
  try {
    const u = new URL(value);
    return u.protocol === "https:" &&
      !u.username &&
      !u.password &&
      (!u.port || u.port === "443") &&
      ([
        "d2ilil7yh5oi1v.cloudfront.net",
        "storage.googleapis.com",
        "firebasestorage.googleapis.com",
        "storage.cloud.google.com",
      ].includes(u.hostname) ||
        u.hostname.endsWith(".storage.googleapis.com"))
      ? u.href
      : null;
  } catch {
    return null;
  }
}
function photoLinksFor(entry) {
  const owned = new Set(
      rows(entry.snapshot.userData, "photos").map((p) => p.assetId),
    ),
    out = {};
  for (const [assetId, item] of Object.entries(
    entry.snapshot.photoLinks || {},
  )) {
    if (
      !owned.has(assetId) ||
      !item ||
      (item.assetId && item.assetId !== assetId)
    )
      continue;
    out[assetId] = { assetId };
    for (const key of ["origUrl", "tmbUrl"]) {
      const url = safePhotoURL(item[key]);
      if (url) out[assetId][key] = url;
    }
  }
  return out;
}
async function importPhotoLinks(id, blob) {
  const entry = entries.get(id);
  if (!entry) throw Error("请先导入帐号");
  if (blob.size > 16 * 1024 ** 2) throw Error("照片链接文件超过16MiB");
  const value = JSON.parse(await blob.text());
  if (
    value.format !== "idoly-photo-links/v1" ||
    value.accountFingerprint !== entry.snapshot.accountFingerprint
  )
    throw Error("照片链接文件与当前帐号不匹配");
  const candidate = {
    snapshot: {
      userData: entry.snapshot.userData,
      photoLinks: value.photoLinks,
    },
  };
  const links = photoLinksFor(candidate);
  entry.snapshot.photoLinks = {
    ...(entry.snapshot.photoLinks || {}),
    ...links,
  };
  entry.snapshot.photoLinkMetadata = {
    createdAt: value.createdAt,
    source: value.source || "imported-photo-links",
    verification: value.verification || {},
  };
  return { records: Object.keys(links).length };
}
function view(id) {
  const entry = entries.get(id);
  if (!entry) throw Error("档案不存在");
  const s = entry.snapshot,
    u = s.userData,
    cards = rows(u, "cards").map((c) => {
      const cid = "char-" + String(c.cardId).split("-")[1];
      const image = s.mediaIndex?.cards?.[c.cardId];
      const url = image ? media(entry, image.file) : null;
      return {
        ...c,
        characterId: cid,
        characterName: name(cid),
        cardName: cardCatalog.cards[c.cardId]?.name || c.cardName || c.name || c.cardId,
        image: url ? { ...image, url } : allowOnlinePreviews && cardCatalog.cards[c.cardId]?.file ? { ...cardCatalog.cards[c.cardId], url: "/" + cardCatalog.cards[c.cardId].file } : null,
      };
    });
  const mediaIndex = structuredClone(s.mediaIndex || {});
  for (const asset of Object.values(mediaIndex.photos || {}))
    for (const k of ["original", "thumbnail"])
      if (asset[k]) asset[k] = media(entry, asset[k]);
  return {
    summary: summary(id),
    photoLinkFingerprint: s.accountFingerprint,
    photoLinks: photoLinksFor(entry),
    cards,
    characters: rows(u, "characters").map((c) => ({
      ...c,
      name: name(c.characterId),
    })),
    userData: u,
    mediaIndex,
    wardrobe: {
      costumes: rows(u, "costumes").map((x) =>
        wardrobeItem(entry, "costumes", x),
      ),
      hairs: rows(u, "hairs").map((x) => wardrobeItem(entry, "hairs", x)),
    },
    supplemental: s.supplemental || [],
    domains: Object.entries(u).map(([k, v]) => ({
      name: k,
      type: Array.isArray(v)
        ? "list"
        : typeof v === "object"
          ? "object"
          : "scalar",
      count: typeof v === "object" && v !== null ? Object.keys(v).length : null,
    })),
  };
}
function unpack(bytes) {
  let total = 0;
  const seen = new Set();
  return unzipSync(bytes, {
    filter: (f) => {
      const n = f.name;
      if (
        n.startsWith("/") ||
        n.includes("\\") ||
        n.includes(":") ||
        n.split("/").some((p) => p === ".." || p === ".") ||
        seen.has(n.toLowerCase())
      )
        throw Error("压缩包存在不安全路径或重名");
      seen.add(n.toLowerCase());
      total += f.originalSize;
      if (total > 128 * 1024 ** 2 || f.originalSize > 64 * 1024 ** 2)
        throw Error("手机导入最多支持128MiB解压数据、单文件64MiB");
      return !n.endsWith("/");
    },
  });
}
async function fingerprint(u) {
  const uid = u.userPublic?.serverUserId || u.userPublic?.publicUserId;
  if (!uid) throw Error("缺少帐号标识");
  return Array.from(
    new Uint8Array(
      await crypto.subtle.digest("SHA-256", enc.encode(String(uid))),
    ),
    (b) => b.toString(16).padStart(2, "0"),
  ).join("");
}
async function imported(blob) {
  if (blob.size > 128 * 1024 ** 2) throw Error("文件超过手机导入上限128MiB");
  const bytes = new Uint8Array(await blob.arrayBuffer());
  let files = null,
    value;
  if (bytes[0] === 80 && bytes[1] === 75) {
    files = unpack(bytes);
    const key = ["account.json", "decoded/user.json", "user.json"].find(
      (k) => files[k],
    );
    if (!key) throw Error("压缩包没有可识别的帐号JSON");
    value = JSON.parse(strFromU8(files[key]));
    if (files["manifest.json"]) {
      const manifest = JSON.parse(strFromU8(files["manifest.json"]));
      for (const [path, expected] of Object.entries(manifest.files || {})) {
        if (!files[path]) throw Error("压缩包缺少清单文件");
        const hash = Array.from(
          new Uint8Array(await crypto.subtle.digest("SHA-256", files[path])),
          (b) => b.toString(16).padStart(2, "0"),
        ).join("");
        if (hash !== expected) throw Error("压缩包文件完整性不一致");
      }
    }
  } else value = JSON.parse(new TextDecoder().decode(bytes));
  const snapshot = value.userData
    ? value
    : {
        format: "idoly-account-snapshot/v1",
        createdAt: new Date().toISOString(),
        scope: "Account",
        source: { kind: "imported-json" },
        userData: value,
        coverage: { allAccountDomainsComplete: false },
      };
  if (!snapshot.userData?.user || typeof snapshot.userData.user !== "object")
    throw Error("没有有效的User/Get帐号资料");
  const fp = await fingerprint(snapshot.userData);
  if (snapshot.scope && !["Account", "Test", "Main"].includes(snapshot.scope))
    throw Error("无法识别的帐号档案类型");
  snapshot.accountFingerprint = fp;
  snapshot.scope = snapshot.scope || "Account";
  if (!files) {
    files = {};
    snapshot.mediaIndex = snapshot.mediaIndex || {};
    snapshot.coverage = {
      ...(snapshot.coverage || {}),
      rawProtobufIncluded: false,
    };
  }
  return add(snapshot, files);
}
async function filesFor(entry) {
  return entry.files || {};
}
async function attachWardrobeMedia(entry, files) {
  const snapshot = structuredClone(entry.snapshot);
  snapshot.mediaIndex ||= {};
  const coverage = {},
    downloads = new Map();
  for (const key of ["costumes", "hairs"]) {
    snapshot.mediaIndex[key] ||= {};
    const owned = rows(snapshot.userData, key);
    let saved = 0,
      defaults = 0;
    await Promise.all(
      owned.map(async (item) => {
        const id = item[key === "costumes" ? "costumeId" : "hairId"],
          definition = wardrobeCatalog[key]?.[id];
        if (key === "hairs" && definition?.category === "costume-default") {
          defaults++;
          snapshot.mediaIndex.hairs[id] = {
            category: "costume-default",
            previewKind: "costume-default-no-independent-preview",
            name: definition.name,
            assetId: definition.assetId,
            characterId: definition.characterId,
          };
          return;
        }
        const packed = snapshot.mediaIndex[key]?.[id];
        if (packed?.file && files["media/" + packed.file]) {
          saved++;
          return;
        }
        const image = definition?.image;
        if (!image) return;
        const file = image.file,
          archivePath = "media/" + file;
        if (!files[archivePath] && !allowOnlinePreviews) return;
        if (!files[archivePath]) {
          if (!downloads.has(file))
            downloads.set(
              file,
              fetch("./" + file)
                .then((r) => {
                  if (!r.ok) throw Error("缩略图下载失败");
                  return r.arrayBuffer();
                })
                .then((b) => new Uint8Array(b)),
            );
          files[archivePath] = await downloads.get(file);
        }
        snapshot.mediaIndex[key][id] = {
          file,
          width: image.width,
          height: image.height,
          name: definition.name,
          characterId: definition.characterId,
          assetId: definition.assetId,
          category: definition.category || "costume",
          previewKind: "native-thumbnail",
        };
        saved++;
      }),
    );
    coverage[key] = {
      records: owned.length,
      independentPreviewExpected: owned.length - defaults,
      saved,
      costumeDefaultRecords: defaults,
    };
  }
  snapshot.coverage = {
    ...(snapshot.coverage || {}),
    wardrobeThumbnails: coverage,
    hairClassification:
      "Costume default records separated from additional hairstyles; no character portrait substitution.",
  };
  return snapshot;
}

async function attachCardMedia(snapshot, files) {
  snapshot.mediaIndex ||= {};
  snapshot.mediaIndex.cards ||= {};
  let saved = 0;
  const owned = rows(snapshot.userData, "cards");
  for (let start = 0; start < owned.length; start += 6) {
    await Promise.all(owned.slice(start, start + 6).map(async (card) => {
      const packed = snapshot.mediaIndex.cards[card.cardId];
      if (packed?.file && files["media/" + packed.file]) { saved++; return; }
      const image = cardCatalog.cards[card.cardId];
      if (!image?.file || !allowOnlinePreviews) return;
      const response = await fetch("./" + image.file);
      if (!response.ok) throw Error("Card thumbnail download failed");
      const bytes = new Uint8Array(await response.arrayBuffer());
      if (bytes.length < 12 || String.fromCharCode(...bytes.slice(0, 4)) !== "RIFF" || String.fromCharCode(...bytes.slice(8, 12)) !== "WEBP") throw Error("Invalid card preview image");
      files["media/" + image.file] = bytes;
      snapshot.mediaIndex.cards[card.cardId] = { ...image };
      saved++;
    }));
  }
  snapshot.coverage.cardPreviews = { records: owned.length, saved, missing: owned.length - saved };
}

async function exported(id) {
  const entry = entries.get(id),
    source = await filesFor(entry);
  const files = { ...source };
  delete files["manifest.json"];
  const snapshot = await attachWardrobeMedia(entry, files);
  await attachCardMedia(snapshot, files);
  files["account.json"] = strToU8(JSON.stringify(snapshot, null, 2));
  const hashes = {};
  for (const [n, b] of Object.entries(files))
    hashes[n] = Array.from(
      new Uint8Array(await crypto.subtle.digest("SHA-256", b)),
      (x) => x.toString(16).padStart(2, "0"),
    ).join("");
  files["manifest.json"] = strToU8(
    JSON.stringify(
      {
        format: "idoly-account-backup/v1",
        createdAt: new Date().toISOString(),
        accountFingerprint: entry.snapshot.accountFingerprint,
        credentialsIncluded: null,
        credentialAssessment: "not-assessed",
        exportMode: "full-backup",
        containsPersonalData: true,
        safeToShare: false,
        files: hashes,
        coverage: snapshot.coverage,
      },
      null,
      2,
    ),
  );
  const bytes = zipSync(files, { level: 6 });
  if (download) URL.revokeObjectURL(download.url);
  download = {
    url: URL.createObjectURL(new Blob([bytes], { type: "application/zip" })),
    filename:
      "IDOLY-" +
      (entry.snapshot.scope || "Account") +
      "-" +
      new Date().toISOString().replaceAll(/[:.]/g, "-") +
      ".zip",
  };
  return { ...download, path: download.filename, bytes: bytes.length };
}
export async function api(path, data, body) {
  const photoImport = path.match(
    /^\/api\/accounts\/([a-f0-9]{32})\/photo-links\/import$/,
  );
  if (photoImport) return importPhotoLinks(photoImport[1], body);
  if (path === "/api/accounts")
    return [...entries.keys()].map(summary).reverse();
  let m = path.match(/^\/api\/accounts\/([a-f0-9]{32})$/);
  if (m) return view(m[1]);
  if (path === "/api/import") return imported(body);
  m = path.match(/^\/api\/accounts\/([a-f0-9]{32})\/export$/);
  if (m) return exported(m[1]);
  if (path === "/api/exports/open-folder") {
    if (!download) throw Error("请先导出帐号包");
    const a = document.createElement("a");
    a.href = download.url;
    a.download = download.filename;
    document.body.append(a);
    a.click();
    a.remove();
    return { downloadStarted: true };
  }
  throw Error("此手机版站点仅浏览备份和本地导入导出，引继验证已暂缓");
}
