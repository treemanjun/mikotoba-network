import { useState, useEffect } from "react";

// ══════════════════════════════════════════════════════════════
//  多言語テキスト定義
// ══════════════════════════════════════════════════════════════
const I18N = {
  ja: {
    siteTitle: "みことばネットワーク",
    siteSubtitle: "各地の伝道者が発信するメディアをつなぐプラットフォーム",
    footer: "みことばネットワーク — 共に福音を広げるために",
    searchPlaceholder: "ミニストリー名・キーワードで検索...",
    themeLabel: "テーマ",
    foundCount: (n) => `${n}名の伝道者が見つかりました`,
    foundCountShort: (n) => `${n}名が見つかりました`,
    notFound: "該当する伝道者が見つかりませんでした",
    viewAll: (n) => `👥 すべての伝道者を見る（${n}名）`,
    backHome: "← ホーム",
    categoryLabel: "カテゴリ",
    allEvangelists: "すべての伝道者",
    broadcasting: (n) => `${n}名が発信中`,
    searchInCategory: "ミニストリー名で検索...",
    themes: ["すべて", "説教", "讃美", "朗読", "情報"],
    categoryDescs: {
      youtube: "動画で聖書や伝道のメッセージを発信",
      blog: "記事や証しを文章で届ける",
      instagram: "写真やリールで日々の働きを共有",
      twitter: "ショートメッセージや祈りを発信",
    },
  },
  en: {
    siteTitle: "Word of God Network",
    siteSubtitle: "A platform connecting evangelists sharing the Gospel across Japan",
    footer: "Word of God Network — Together spreading the Gospel",
    searchPlaceholder: "Search by ministry name or keyword...",
    themeLabel: "Theme",
    foundCount: (n) => `${n} evangelist${n !== 1 ? "s" : ""} found`,
    foundCountShort: (n) => `${n} found`,
    notFound: "No evangelists found",
    viewAll: (n) => `👥 View all evangelists (${n})`,
    backHome: "← Home",
    categoryLabel: "Category",
    allEvangelists: "All Evangelists",
    broadcasting: (n) => `${n} active`,
    searchInCategory: "Search by ministry name...",
    themes: ["All", "Sermon", "Praise", "Reading", "News"],
    categoryDescs: {
      youtube: "Sharing Bible messages and ministry via video",
      blog: "Delivering testimonies and articles in writing",
      instagram: "Sharing daily ministry life through photos & reels",
      twitter: "Posting short messages and prayers",
    },
  },
  ko: {
    siteTitle: "말씀 네트워크",
    siteSubtitle: "각지의 전도자들이 발신하는 미디어를 연결하는 플랫폼",
    footer: "말씀 네트워크 — 함께 복음을 전파하기 위해",
    searchPlaceholder: "사역 이름·키워드로 검색...",
    themeLabel: "테마",
    foundCount: (n) => `${n}명의 전도자를 찾았습니다`,
    foundCountShort: (n) => `${n}명 발견`,
    notFound: "해당하는 전도자를 찾지 못했습니다",
    viewAll: (n) => `👥 모든 전도자 보기（${n}명）`,
    backHome: "← 홈",
    categoryLabel: "카테고리",
    allEvangelists: "모든 전도자",
    broadcasting: (n) => `${n}명 활동 중`,
    searchInCategory: "사역 이름으로 검색...",
    themes: ["전체", "설교", "찬양", "낭독", "정보"],
    categoryDescs: {
      youtube: "동영상으로 성경과 전도 메시지 발신",
      blog: "글로 간증과 기사를 전달",
      instagram: "사진과 릴로 일상 사역을 공유",
      twitter: "짧은 메시지와 기도를 발신",
    },
  },
  es: {
    siteTitle: "Red Palabra de Dios",
    siteSubtitle: "Una plataforma que conecta a evangelistas de todo Japón",
    footer: "Red Palabra de Dios — Juntos difundiendo el Evangelio",
    searchPlaceholder: "Buscar por nombre de ministerio o palabra clave...",
    themeLabel: "Tema",
    foundCount: (n) => `${n} evangelista${n !== 1 ? "s" : ""} encontrado${n !== 1 ? "s" : ""}`,
    foundCountShort: (n) => `${n} encontrado${n !== 1 ? "s" : ""}`,
    notFound: "No se encontraron evangelistas",
    viewAll: (n) => `👥 Ver todos los evangelistas (${n})`,
    backHome: "← Inicio",
    categoryLabel: "Categoría",
    allEvangelists: "Todos los Evangelistas",
    broadcasting: (n) => `${n} activo${n !== 1 ? "s" : ""}`,
    searchInCategory: "Buscar por nombre de ministerio...",
    themes: ["Todos", "Sermón", "Alabanza", "Lectura", "Noticias"],
    categoryDescs: {
      youtube: "Compartiendo mensajes bíblicos y ministeriales en video",
      blog: "Testimonios y artículos entregados por escrito",
      instagram: "Compartiendo la vida ministerial con fotos y reels",
      twitter: "Publicando mensajes cortos y oraciones",
    },
  },
};

// テーマの日本語マスターキー（内部管理用）
const JA_THEMES = ["説教", "讃美", "朗読", "情報"];

const LANG_OPTIONS = [
  { code: "ja", label: "日本語", flag: "🇯🇵" },
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "ko", label: "한국어", flag: "🇰🇷" },
  { code: "es", label: "Español", flag: "🇪🇸" },
];

// ══════════════════════════════════════════════════════════════
//  伝道者データ
// ══════════════════════════════════════════════════════════════
const evangelists = [
  {
    id: 1, name: "田中 恵一", ministryName: "恵みの光ミニストリー", church: "恵みの光教会", region: "東京都",
    ministryUrl: "https://megumi-hikari.church",
    themes: ["説教", "情報"],
    youtube: "https://youtube.com/@tanaka-ministry", youtubeName: "田中恵一 福音チャンネル",
    blog: "https://tanaka-ministry.com", blogName: "恵みの光ミニストリー",
    instagram: "https://instagram.com/tanaka_ministry", instagramName: "@tanaka_ministry",
    twitter: "https://x.com/tanaka_ministry", twitterName: "@tanaka_ministry",
    bio: {
      ja: "20年以上にわたり、街頭伝道と聖書講解を通じて福音を伝えています。",
      en: "For over 20 years, sharing the Gospel through street evangelism and Bible exposition.",
      ko: "20년 이상 거리 전도와 성경 강해를 통해 복음을 전하고 있습니다.",
      es: "Por más de 20 años, compartiendo el Evangelio a través del evangelismo callejero y la exposición bíblica.",
    },
  },
  {
    id: 2, name: "山田 マリア", ministryName: "プレイズ・ウィズ・マリア", church: "聖泉キリスト教会", region: "大阪府",
    ministryUrl: "https://seisen-church.jp",
    themes: ["讃美", "朗読"],
    youtube: "https://youtube.com/@yamada-praise", youtubeName: "マリアの讃美 / Praise with Maria",
    blog: null, blogName: null,
    instagram: "https://instagram.com/yamada_praise", instagramName: "@yamada_praise",
    twitter: null, twitterName: null,
    bio: {
      ja: "ワーシップリーダーとして礼拝の回復と讃美の喜びを各地で伝えています。",
      en: "As a worship leader, traveling to bring revival in worship and the joy of praise.",
      ko: "워십 리더로서 예배의 회복과 찬양의 기쁨을 각지에서 전하고 있습니다.",
      es: "Como líder de adoración, viajando para traer avivamiento en la adoración y el gozo de la alabanza.",
    },
  },
  {
    id: 3, name: "鈴木 ダビデ", ministryName: "いのちの言葉ミニストリー", church: "いのちの言葉教会", region: "福岡県",
    ministryUrl: null,
    themes: ["説教", "朗読"],
    youtube: null, youtubeName: null,
    blog: "https://suzuki-bible.com", blogName: "聖書と家族のブログ",
    instagram: null, instagramName: null,
    twitter: "https://x.com/suzuki_david", twitterName: "@suzuki_david",
    bio: {
      ja: "家族への聖書の適用と、地域に根ざした伝道活動を続けています。",
      en: "Applying the Bible to family life and continuing community-rooted evangelism.",
      ko: "가족에 대한 성경의 적용과 지역 사회에 뿌리를 둔 전도 활동을 계속하고 있습니다.",
      es: "Aplicando la Biblia a la vida familiar y continuando el evangelismo arraigado en la comunidad.",
    },
  },
  {
    id: 4, name: "佐藤 ルツ", ministryName: "希望の泉ミニストリー", church: "希望の泉教会", region: "北海道",
    ministryUrl: "https://kibou-izumi.org",
    themes: ["情報", "讃美"],
    youtube: "https://youtube.com/@sato-ruth", youtubeName: "佐藤ルツ 祈りと伝道",
    blog: "https://sato-ruth.jp", blogName: "希望の泉 ミニストリーブログ",
    instagram: "https://instagram.com/sato_ruth", instagramName: "@sato_ruth",
    twitter: "https://x.com/sato_ruth", twitterName: "@sato_ruth",
    bio: {
      ja: "祈りの力と伝道の情熱をもって、北海道各地を巡回しています。",
      en: "Traveling across Hokkaido with the power of prayer and a passion for evangelism.",
      ko: "기도의 힘과 전도의 열정으로 홋카이도 각지를 순회하고 있습니다.",
      es: "Viajando por toda Hokkaido con el poder de la oración y una pasión por el evangelismo.",
    },
  },
  {
    id: 5, name: "高橋 ヨシュア", ministryName: "山からの伝道ミニストリー", church: "山の上の教会", region: "長野県",
    ministryUrl: "https://takahashi-joshua.com",
    themes: ["説教", "讃美"],
    youtube: "https://youtube.com/@takahashi-joshua", youtubeName: "高橋ヨシュア / 山からの伝道",
    blog: "https://takahashi-joshua.com", blogName: "山の上から — 高橋ヨシュアのブログ",
    instagram: null, instagramName: null,
    twitter: "https://x.com/takahashi_josh", twitterName: "@takahashi_josh",
    bio: {
      ja: "山岳地帯での伝道と自然の中でのリトリートを通じて福音を分かち合っています。",
      en: "Sharing the Gospel through mountain evangelism and retreats in nature.",
      ko: "산악 지역의 전도와 자연 속 리트리트를 통해 복음을 나누고 있습니다.",
      es: "Compartiendo el Evangelio a través del evangelismo en la montaña y retiros en la naturaleza.",
    },
  },
];

const CATEGORIES = [
  { key: "youtube",   nameKey: "youtubeName",   label: "YouTube",     icon: "▶", color: "#c0392b", bg: "rgba(192,57,43,0.08)",  border: "rgba(192,57,43,0.2)"  },
  { key: "blog",      nameKey: "blogName",      label: "Blog",        icon: "✍", color: "#2c7a4b", bg: "rgba(44,122,75,0.08)",  border: "rgba(44,122,75,0.2)"  },
  { key: "instagram", nameKey: "instagramName", label: "Instagram",   icon: "📷", color: "#8e24aa", bg: "rgba(142,36,170,0.08)", border: "rgba(142,36,170,0.2)" },
  { key: "twitter",   nameKey: "twitterName",   label: "X (Twitter)", icon: "𝕏", color: "#1a1a2e", bg: "rgba(26,26,46,0.07)",   border: "rgba(26,26,46,0.15)"  },
];

// ══════════════════════════════════════════════════════════════
//  言語切り替えボタン
// ══════════════════════════════════════════════════════════════
function LangSwitcher({ lang, setLang }) {
  return (
    <div style={{ display: "flex", gap: 6, justifyContent: "flex-end", marginBottom: 24, flexWrap: "wrap" }}>
      {LANG_OPTIONS.map((l) => (
        <button key={l.code} onClick={() => setLang(l.code)} style={{
          padding: "5px 12px", borderRadius: 20, fontSize: 12, fontWeight: 700,
          cursor: "pointer", transition: "all 0.15s",
          border: lang === l.code ? "1.5px solid #b08050" : "1.5px solid rgba(160,130,100,0.3)",
          background: lang === l.code ? "rgba(180,130,80,0.15)" : "rgba(255,253,248,0.7)",
          color: lang === l.code ? "#7a4a18" : "#9a7a5a",
          backdropFilter: "blur(6px)",
        }}>
          {l.flag} {l.label}
        </button>
      ))}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
//  アバター
// ══════════════════════════════════════════════════════════════
function Avatar({ name, size = 56 }) {
  const colors = ["#b07840", "#4a8ab0", "#7a50a8", "#4a9870"];
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: colors[name.charCodeAt(0) % colors.length],
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.4, color: "#fff",
      fontFamily: "'Noto Serif JP', serif", fontWeight: 700, flexShrink: 0,
      border: "2px solid rgba(255,255,255,0.7)", boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
    }}>
      {name.charAt(0)}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
//  伝道者カード
// ══════════════════════════════════════════════════════════════
function EvangelistCard({ ev, highlightKey, t, lang }) {
  const cat = CATEGORIES.find((c) => c.key === highlightKey);
  const url = highlightKey && highlightKey !== "all" ? ev[highlightKey] : null;

  return (
    <div style={{
      background: "rgba(255,253,248,0.88)", border: "1px solid rgba(180,150,110,0.2)",
      borderRadius: 18, padding: 20, backdropFilter: "blur(10px)",
      boxShadow: "0 2px 16px rgba(120,80,40,0.07)", transition: "transform 0.18s, box-shadow 0.18s",
    }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 10px 28px rgba(120,80,40,0.12)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 16px rgba(120,80,40,0.07)"; }}
    >
      <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 12 }}>
        <Avatar name={ev.ministryName || ev.name} />
        <div>
          <div style={{ fontFamily: "'Noto Serif JP', serif", fontSize: 17, fontWeight: 800, color: "#3a2718" }}>
            {ev.ministryName || ev.name}
          </div>
          {ev.ministryUrl && (
            <a
              href={ev.ministryUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 4,
                fontSize: 11, color: "#5a7a4a", marginTop: 4,
                textDecoration: "none", opacity: 0.85,
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = "1"}
              onMouseLeave={(e) => e.currentTarget.style.opacity = "0.85"}
            >
              🌐 {ev.ministryUrl.replace(/^https?:\/\//, "")}
            </a>
          )}
          <div style={{ display: "flex", gap: 5, marginTop: 5, flexWrap: "wrap" }}>
            {ev.themes.map((jaTheme) => {
              const idx = JA_THEMES.indexOf(jaTheme);
              const label = idx >= 0 ? (t.themes[idx + 1] || jaTheme) : jaTheme;
              return (
                <span key={jaTheme} style={{
                  background: "rgba(180,140,90,0.15)", color: "#7a5a2a",
                  borderRadius: 12, padding: "2px 8px", fontSize: 10, fontWeight: 600,
                }}>
                  {label}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      <p style={{ fontSize: 12, color: "#6a4a32", lineHeight: 1.7, margin: "0 0 14px" }}>
        {ev.bio[lang] || ev.bio.ja}
      </p>

      {url && cat && (
        <a href={url} target="_blank" rel="noopener noreferrer" style={{
          display: "flex", alignItems: "center", gap: 10, padding: "10px 16px",
          borderRadius: 12, background: cat.bg, border: `1.5px solid ${cat.border}`,
          color: cat.color, textDecoration: "none", transition: "opacity 0.15s",
        }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = "0.75"}
          onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
        >
          <span style={{ fontSize: 20, flexShrink: 0 }}>{cat.icon}</span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 10, opacity: 0.7, marginBottom: 1 }}>{cat.label}</div>
            <div style={{ fontSize: 13, fontWeight: 800, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {ev[cat.nameKey] || cat.label}
            </div>
          </div>
          <span style={{ fontSize: 12, opacity: 0.6 }}>→</span>
        </a>
      )}

      {highlightKey === "all" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {CATEGORIES.filter((c) => ev[c.key]).map((c) => (
            <a key={c.key} href={ev[c.key]} target="_blank" rel="noopener noreferrer" style={{
              display: "flex", alignItems: "center", gap: 10, padding: "8px 14px",
              borderRadius: 10, background: c.bg, border: `1px solid ${c.border}`,
              color: c.color, textDecoration: "none", transition: "opacity 0.15s",
            }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = "0.7"}
              onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
            >
              <span style={{ fontSize: 16, flexShrink: 0 }}>{c.icon}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 9, opacity: 0.65, marginBottom: 1 }}>{c.label}</div>
                <div style={{ fontSize: 12, fontWeight: 700, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {ev[c.nameKey] || c.label}
                </div>
              </div>
              <span style={{ fontSize: 11, opacity: 0.5 }}>→</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
//  ホーム画面
// ══════════════════════════════════════════════════════════════
function HomeView({ onSelectCategory, t, lang }) {
  // テーマはインデックスで管理（言語に依存しない）
  const [searchText, setSearchText] = useState("");
  const [themeIdx, setThemeIdx]     = useState(0);

  // 言語切り替え時にフィルターをリセット
  useEffect(() => {
    setSearchText("");
    setThemeIdx(0);
  }, [lang]);

  const searchFiltered = evangelists.filter((ev) => {
    const matchSearch = !searchText ||
      ev.name.includes(searchText) ||
      ev.church.includes(searchText) ||
      (ev.bio[lang] || ev.bio.ja).includes(searchText);
    const jaTheme = themeIdx > 0 ? JA_THEMES[themeIdx - 1] : null;
    const matchTheme = !jaTheme || ev.themes.includes(jaTheme);
    return matchSearch && matchTheme;
  });

  const isFiltering = searchText || themeIdx !== 0;

  return (
    <div>
      {/* ヒーロー */}
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        {/* ロゴ画像 */}
        <img
          src="/logo.png"
          alt="Red Farm Ministry"
          style={{ display: "block", margin: "0 auto 14px", height: 60, width: "auto", borderRadius: 12, background: "#fff", padding: "6px 16px" }}
        />
        <h1 style={{
          fontFamily: "'Noto Serif JP', serif",
          fontSize: "clamp(22px, 4.5vw, 38px)", fontWeight: 900,
          color: "#1a2e10", margin: "0 0 6px", letterSpacing: "0.05em",
        }}>
          {t.siteTitle}
        </h1>
        <p style={{ color: "#5a7a3a", fontSize: 13, letterSpacing: "0.06em" }}>
          {t.siteSubtitle}
        </p>
        <div style={{ width: 50, height: 2, background: "linear-gradient(90deg,transparent,#d4aa28,transparent)", margin: "14px auto 0" }} />
      </div>

      {/* 検索・フィルター */}
      <div style={{
        background: "rgba(255,253,248,0.8)", borderRadius: 16, padding: 20, marginBottom: 32,
        backdropFilter: "blur(12px)", border: "1px solid rgba(180,150,110,0.15)",
        boxShadow: "0 2px 16px rgba(120,80,40,0.06)",
      }}>
        <input
          type="text" placeholder={t.searchPlaceholder} value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{
            width: "100%", padding: "10px 16px", borderRadius: 10,
            border: "1px solid rgba(160,130,100,0.3)", background: "rgba(255,255,255,0.7)",
            fontSize: 14, color: "#3a2718", outline: "none",
            boxSizing: "border-box", marginBottom: 14,
            fontFamily: "'Noto Sans JP', sans-serif",
          }}
        />
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 140 }}>
            <label style={{ fontSize: 11, color: "#9a7a5a", display: "block", marginBottom: 4 }}>{t.themeLabel}</label>
            <select value={themeIdx} onChange={(e) => setThemeIdx(Number(e.target.value))}
              style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: "1px solid rgba(160,130,100,0.3)", background: "rgba(255,255,255,0.7)", fontSize: 13, color: "#3a2718", fontFamily: "'Noto Sans JP', sans-serif", cursor: "pointer" }}>
              {t.themes.map((th, i) => <option key={i} value={i}>{th}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* 検索結果 */}
      {isFiltering && (
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontSize: 13, color: "#9a7a5a", marginBottom: 14 }}>
            {t.foundCount(searchFiltered.length)}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {searchFiltered.length === 0 ? (
              <div style={{ textAlign: "center", color: "#9a7a5a", padding: 40 }}>{t.notFound}</div>
            ) : (
              searchFiltered.map((ev) => <EvangelistCard key={ev.id} ev={ev} highlightKey="all" t={t} lang={lang} />)
            )}
          </div>
        </div>
      )}

      {/* カテゴリタイル＋全員ボタン */}
      {!isFiltering && <>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20, marginBottom: 40 }}>
          {CATEGORIES.map((cat) => {
            const count = evangelists.filter((e) => e[cat.key]).length;
            return (
              <button key={cat.key} onClick={() => onSelectCategory(cat.key)} style={{
                background: cat.bg, border: `1.5px solid ${cat.border}`, borderRadius: 18,
                padding: "28px 24px", cursor: "pointer", textAlign: "left",
                transition: "transform 0.18s, box-shadow 0.18s", backdropFilter: "blur(8px)",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 12px 32px ${cat.border}`; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{ fontSize: 32, marginBottom: 10 }}>{cat.icon}</div>
                <div style={{ fontFamily: "'Noto Serif JP', serif", fontSize: 20, fontWeight: 800, color: cat.color, marginBottom: 6 }}>
                  {cat.label}
                </div>
                <div style={{ fontSize: 12, color: "#7a5a3a", marginBottom: 12, lineHeight: 1.6 }}>
                  {t.categoryDescs[cat.key]}
                </div>
                <div style={{ display: "inline-block", background: cat.color, color: "#fff", borderRadius: 20, padding: "3px 12px", fontSize: 12, fontWeight: 700 }}>
                  {t.broadcasting(count)}
                </div>
              </button>
            );
          })}
        </div>

        <div style={{ textAlign: "center" }}>
          <button onClick={() => onSelectCategory("all")} style={{
            background: "rgba(255,253,248,0.85)", border: "1.5px solid rgba(160,130,100,0.25)",
            borderRadius: 40, padding: "12px 32px", fontSize: 14, fontWeight: 700,
            color: "#7a5a3a", cursor: "pointer", fontFamily: "'Noto Sans JP', sans-serif", transition: "all 0.18s",
          }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.95)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(120,80,40,0.12)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,253,248,0.85)"; e.currentTarget.style.boxShadow = "none"; }}
          >
            {t.viewAll(evangelists.length)}
          </button>
        </div>
      </>}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
//  カテゴリ一覧画面
// ══════════════════════════════════════════════════════════════
function CategoryView({ categoryKey, onBack, t, lang }) {
  const [search, setSearch] = useState("");
  const cat = CATEGORIES.find((c) => c.key === categoryKey);
  const isAll = categoryKey === "all";

  useEffect(() => { setSearch(""); }, [categoryKey, lang]);

  const list = evangelists.filter((ev) => {
    const hasCategory = isAll ? true : !!ev[categoryKey];
    const matchSearch = !search ||
      ev.name.includes(search) ||
      ev.church.includes(search) ||
      ev.region.includes(search);
    return hasCategory && matchSearch;
  });

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
        <button onClick={onBack} style={{
          background: "rgba(255,253,248,0.85)", border: "1px solid rgba(160,130,100,0.25)",
          borderRadius: 10, padding: "8px 16px", fontSize: 13, color: "#7a5a3a",
          cursor: "pointer", fontFamily: "'Noto Sans JP', sans-serif",
          display: "flex", alignItems: "center", gap: 6,
        }}>
          {t.backHome}
        </button>
        <div>
          <div style={{ fontSize: 11, color: "#9a7a5a" }}>{t.categoryLabel}</div>
          <div style={{ fontFamily: "'Noto Serif JP', serif", fontSize: 22, fontWeight: 800, color: cat ? cat.color : "#3a2718", display: "flex", alignItems: "center", gap: 8 }}>
            {cat ? cat.icon : "👥"} {cat ? cat.label : t.allEvangelists}
          </div>
        </div>
      </div>

      <input type="text" placeholder={t.searchInCategory} value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%", padding: "10px 16px", borderRadius: 12,
          border: "1px solid rgba(160,130,100,0.3)", background: "rgba(255,255,255,0.7)",
          fontSize: 13, color: "#3a2718", outline: "none",
          boxSizing: "border-box", marginBottom: 20,
          fontFamily: "'Noto Sans JP', sans-serif",
        }}
      />

      <div style={{ fontSize: 12, color: "#9a7a5a", marginBottom: 14 }}>
        {t.foundCountShort(list.length)}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {list.length === 0 ? (
          <div style={{ textAlign: "center", color: "#9a7a5a", padding: 60 }}>{t.notFound}</div>
        ) : (
          list.map((ev) => <EvangelistCard key={ev.id} ev={ev} highlightKey={categoryKey} t={t} lang={lang} />)
        )}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
//  メインアプリ
// ══════════════════════════════════════════════════════════════
export default function MinistryPlatform() {
  const [lang, setLang] = useState("ja");
  const [view, setView] = useState("home");
  const t = I18N[lang];

  const handleLangChange = (newLang) => {
    setLang(newLang);
    setView("home"); // 言語切り替え時はホームに戻る
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg,#f5ece0 0%,#e8ddd0 45%,#f0e6d4 100%)",
      fontFamily: "'Noto Sans JP', sans-serif",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "fixed", top: -100, right: -100, width: 380, height: 380, borderRadius: "50%", background: "radial-gradient(circle,rgba(200,170,130,0.13) 0%,transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "fixed", bottom: -80, left: -80, width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle,rgba(160,130,100,0.1) 0%,transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 820, margin: "0 auto", padding: "32px 20px" }}>
        <LangSwitcher lang={lang} setLang={handleLangChange} />

        {view === "home" ? (
          <HomeView onSelectCategory={(key) => setView(key)} t={t} lang={lang} />
        ) : (
          <CategoryView categoryKey={view} onBack={() => setView("home")} t={t} lang={lang} />
        )}

        <div style={{ textAlign: "center", marginTop: 60, color: "#b09a7a", fontSize: 12, letterSpacing: "0.1em" }}>
          {t.footer}
        </div>
      </div>
    </div>
  );
}
