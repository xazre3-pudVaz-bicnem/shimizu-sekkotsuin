/**
 * 施術事例。掲載を承諾いただいた方の「お客様の声」（content/voices.ts）をもとに、
 * 来院前の状況・経過・通院の目安を整理したもの。文章はご本人の言葉からの引用のみで構成し、
 * 院側の評価や効果の断定は含めない。※個人の経過であり、結果を保証するものではありません。
 */
export type CaseSummary = {
  id: string;
  /** 参照するお客様の声のID */
  voiceId: string;
  /** 主な症状（症状ページのslug。最初の要素を主症状として一覧に表示） */
  symptomSlugs: string[];
  title: string;
  /** 来院前の状況（ご本人の言葉から） */
  before: string;
  /** 医療機関・他院での経過（ご本人の言葉から。なければ省略） */
  medical?: string;
  /** 通院後の経過（ご本人の言葉から） */
  after: string;
  /** 通院の目安（ご本人の言葉に記載があるもののみ） */
  visits?: string;
};

export const cases: CaseSummary[] = [
  {
    id: "case-is",
    voiceId: "is-90s",
    symptomSlugs: ["lower-back-pain", "hip-pain", "hip-osteoarthritis"],
    title: "90代・腰と股関節の痛みで杖や手すりが必要だった方",
    before: "腰と股関節辺りから膝にかけて痛みが走り、杖や手すりにつかまりながら歩くようでした。",
    after: "施術を受けるたびに症状が楽になっていき、今では買い物や散歩に不安なく行くことができるようになりました。",
    visits: "継続して通院（回数の記載なし）",
  },
  {
    id: "case-hh",
    voiceId: "hh-arakawa",
    symptomSlugs: ["spinal-stenosis", "sciatica", "lower-back-pain"],
    title: "荒川区・3年続いた脊柱管狭窄症のお尻から脚の痛み",
    before: "三年位前から、ズキズキとしたお尻から足の痛みで目が覚めてました。昼間も階段の上り下りや歩くのも辛い状態でした。",
    medical: "他の接骨院で電気治療やマッサージ、整形外科で脊柱管狭窄症と言われ痛み止めを処方。",
    after: "施術を受けた夜からぐっすり眠れるようになり翌日から痛みが軽くなりました。階段の上り下りや歩行がこんなに楽になるならもっと早く来れば良かった。",
    visits: "3〜4回目で痛みが消え、5回目のメンテナンスで卒業（ご本人談）",
  },
  {
    id: "case-s-knee",
    voiceId: "s-knee",
    symptomSlugs: ["lower-back-pain", "sciatica", "knee-pain", "leg-numbness"],
    title: "15年来の腰・脚・膝の痛みとしびれ",
    before: "15年位前から腰や足 ヒザが痛みやしびれ重苦しさがありました。歩くのが年々つらくなり。",
    medical: "いろんな病院に行きましたが特に治療もなく、痛み止めとシップのみ。",
    after: "施術を受けるたびだんだんと身体が軽くなり、足に力が入るようになり直立が楽になりました。重いものも苦になく持てるようになり。",
  },
  {
    id: "case-s-sciatica",
    voiceId: "s-sciatica",
    symptomSlugs: ["sciatica", "lower-back-pain", "leg-numbness"],
    title: "家事で立ち続けると腰が重だるく、お尻から足がしびれる",
    before: "家事などで少し立ち続けていると腰が重だるくなり、お尻から足のまでがだんだんにしびれてきました。",
    medical: "整形外科でレントゲン。腰の軟骨が減ってきているので牽引と痛み止めを処方。",
    after: "施術は初回から体が軽くなるのを実感できました。4回目でほとんど痛みがなくなりました。",
    visits: "4回目でほとんど痛みがなくなり、その後は月2回のメンテナンス（ご本人談）",
  },
  {
    id: "case-f",
    voiceId: "f-ogi",
    symptomSlugs: ["sciatica", "leg-numbness", "lower-back-pain"],
    title: "足立区扇・半年続いたお尻から太ももの裏のしびれ",
    before: "半年位前からだんだんと症状が出てきてお尻のあたりからモモの裏の方がしびれていました。車の運転や歩いているときも辛い状態でした。",
    medical: "整形外科でけん引をして出されたシップを貼っていました。",
    after: "5〜6回目ぐらいから痛みが軽くなりだしてしびれも徐々に薄らいでいくのを感じました。痛みの改善だけでなくその原因を教えてもらい、悪い生活習慣の改善もできました。",
    visits: "5〜6回目から変化を感じた（ご本人談）",
  },
  {
    id: "case-h",
    voiceId: "h-corset",
    symptomSlugs: ["lower-back-pain", "sciatica", "leg-numbness"],
    title: "草むしりのあとに出た腰の痛みと足のしびれ",
    before: "1ヶ月ほど前に無理な姿勢で草むしりをして以来、腰の痛みと足の痺れが出てきてしばらく様子を見てました。",
    medical: "病院で出されたコルセットをしたり、湿布を貼ったりストレッチ体操など。",
    after: "初回から痛みと痺れが取れて腰の動きが良くなり、体全体が軽くなったように感じました。コルセットも必要なくなりました。",
  },
  {
    id: "case-mh",
    voiceId: "mh-70s",
    symptomSlugs: ["lower-back-pain", "knee-pain", "chronic-lower-back-pain"],
    title: "70代・立ち仕事を続けるための腰と膝のケア",
    before: "数か月前から痛みが始まり、数日前からは歩くのも困難な状態でした。立ち仕事を続けていかなければならず。",
    after: "何度目かの施術で歩くのが平気になり、痛みの出る前よりも足の運びが楽になり、今では元気に仕事にも行けるようになりました。",
    visits: "その後も定期的に身体の調整に通院（ご本人談）",
  },
  {
    id: "case-no",
    voiceId: "no-gikkuri",
    symptomSlugs: ["acute-lower-back-pain", "lower-back-pain", "leg-numbness"],
    title: "ぎっくり腰で動けず、太ももからふくらはぎにしびれ",
    before: "ぎっくり腰になり動けず、立ち上がるのも苦労しました。またモモからふくらはぎに痺れが出ていました。",
    medical: "以前のぎっくり腰では整形外科で注射を受けた。",
    after: "初回の施術で伸ばす事ができずにいた腰が伸ばせるようになり、歩くのもかなり楽になりました。2回目の施術の後は痛みも無く普通の生活が出来る様になりました。",
    visits: "2回（ご本人談）",
  },
  {
    id: "case-a",
    voiceId: "a-arakawa",
    symptomSlugs: ["sciatica", "hip-pain"],
    title: "荒川区・3〜4年続いた立ち仕事と歩行時のお尻から太ももの痛み",
    before: "3~4年前から立ち仕事や、10分くらい歩くとお尻からモモにかけて強い痛みが出て休み休みでないと動けない状態でした。",
    medical: "病院で痛み止めの薬と湿布。",
    after: "一回目の施術後から楽になりましたが、まだ痛みが残っていました。毎回通う度にどんどん楽になり、今ではすっかり良くなりました。",
  },
  {
    id: "case-sk",
    voiceId: "sk",
    symptomSlugs: ["chronic-lower-back-pain", "lower-back-pain", "back-pain"],
    title: "半年続いた背中・腰・お尻の痛みと太もものしびれ",
    before: "特に長時間椅子に座っていると腰が重く痛み出し、立ち上がり歩き出すのにも時間がかかり、腰の曲げ伸ばしが辛い状態でした。",
    after: "立ち上がるのも凄く楽になり腰を反らせるようになりました。先日は趣味のオートバイに長時間乗っていてもなんともなく、ツーリングを楽しめました。",
    visits: "その後も定期的なメンテナンスで通院予定（ご本人談）",
  },
  {
    id: "case-ne",
    voiceId: "ne",
    symptomSlugs: ["chronic-lower-back-pain", "sciatica", "leg-numbness"],
    title: "4年続いた腰からお尻・脛にかけての痛みとしびれ",
    before: "ここ3〜4年はお尻からモモの裏から脛にかけて痛みと痺れが出るようになり、15分位立ち続けると痛みがひどく、休まなくてはならないほどでした。",
    medical: "他の接骨院で電気とマッサージ、整形外科でけん引と薬。",
    after: "一回目の治療の後に今迄にないくらい楽になり、帰ってからも台所仕事が休まずにできるようになり4年間の悩みがスッと軽くなりました。",
  },
  {
    id: "case-nh",
    voiceId: "nh",
    symptomSlugs: ["acute-lower-back-pain", "lower-back-pain"],
    title: "起床時から腰が伸ばせず歩行も困難だった腰痛",
    before: "起床の際に痛くて歩行も困難で、腰が伸ばせなくなり動くと腰に痛みが響くじょうたいでした。",
    after: "腰をまっすぐに伸ばしても痛みがでなくなりました。予想外にソフトなので驚いた。",
  },
  {
    id: "case-km",
    voiceId: "km",
    symptomSlugs: ["back-pain", "shoulder-stiffness"],
    title: "背中全体が凝って重苦しい痛み",
    before: "背中全体が凝った感じで重苦しい痛みがでた。ストレッチ運動をしていました。",
    after: "硬かった背中が柔らかくなり、骨盤のまわりもゆるんで足に動きがスムーズになり、体が楽になりました。",
  },
  {
    id: "case-n",
    voiceId: "n-sciatica",
    symptomSlugs: ["sciatica", "hip-pain"],
    title: "1か月続いた坐骨神経痛で座っても立ってもつらい",
    before: "1ヶ月前位から座骨神経痛でお尻からモモにかけてのいたみで、座っていても立っていても辛かった。",
    after: "初回の施術でほとんどいたみがなくなりました。強くて痛い指圧やマッサージと違い、ソフトな治療なので楽に受けられました。",
  },
  {
    id: "case-postpartum",
    voiceId: "s-postpartum",
    symptomSlugs: ["knee-pain", "postpartum-back-pain"],
    title: "妊娠後期から産後に強くなった膝の痛み",
    before: "妊娠後期から膝の痛みが出始めて、産後はだんだんと痛みが強くなり、何もしていなくてもジンジンするようになり、階段の昇り降りや膝の曲げ伸ばしが辛かったです。",
    after: "初回でズキズキするような痛みが治まり、曲げ伸ばしもかなり楽になりました。その後は週一回の通院で数回かよい階段やしゃがむのも出来るようになりました。",
    visits: "週1回・数回（ご本人談）",
  },
];

export const CASE_DISCLAIMER =
  "※施術事例は、掲載を承諾いただいた方の声（ご本人の言葉）をもとに整理したものです。個人の経過であり、施術の結果や効果を保証するものではありません。通院回数や期間には個人差があります。";
