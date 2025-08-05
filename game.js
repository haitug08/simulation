
const storyElement = document.getElementById("story");
const choicesElement = document.getElementById("choices");

let state = {};

function showTextNode(id) {
  const textNode = textNodes.find(node => node.id === id);
  storyElement.innerText = textNode.text;
  choicesElement.innerHTML = "";

  textNode.choices.forEach(choice => {
    if (choice.requiredState == null || choice.requiredState(state)) {
      const button = document.createElement("button");
      button.innerText = choice.text;
      button.onclick = () => selectChoice(choice);
      choicesElement.appendChild(button);
    }
  });
}

function selectChoice(choice) {
  const nextState = Object.assign({}, state, choice.setState);
  state = nextState;
  showTextNode(choice.nextText);
}

const textNodes = [
  {
    id: 1,
    text: "あなたはBさん。A社からアポ獲得業務を請け負った。報酬をめぐってトラブル発生！さて、bonobo保険に加入している？",
    choices: [
      { text: "加入している", setState: { bonobo: true }, nextText: 2 },
      { text: "加入していない", setState: { bonobo: false }, nextText: 3 }
    ]
  },
  {
    id: 2,
    text: "弁護士にすぐ相談できた！どうする？",
    choices: [
      { text: "弁護士に交渉を依頼する", nextText: 4 },
      { text: "裁判を起こす", nextText: 5 }
    ]
  },
  {
    id: 3,
    text: "自力でどうにかするしかない…。どうする？",
    choices: [
      { text: "A社に直接抗議する", nextText: 8 },
      { text: "SNSで晒す", nextText: 7 }
    ]
  },
  {
    id: 4,
    text: "弁護士の交渉により契約通り15万円を獲得！グッドエンド！🎉",
    choices: [
      { text: "もう一度プレイ", nextText: 1 }
    ]
  },
  {
    id: 5,
    text: "裁判は時間もお金もかかったが、最終的に勝訴して報酬全額+αを獲得！真グッドエンド！🏆",
    choices: [
      { text: "もう一度プレイ", nextText: 1 }
    ]
  },
  {
    id: 6,
    text: "話は平行線…活動費の5万円のみで我慢するしかなかった。バッドエンド😢",
    choices: [
      { text: "もう一度プレイ", nextText: 1 }
    ]
  },
  {
    id: 7,
    text: "炎上したが事態は悪化。名誉毀損で訴えられる羽目に…バッドエンド🔥",
    choices: [
      { text: "もう一度プレイ", nextText: 1 }
    ]
  },
  {
    id: 8,
    text: "A社の営業部長：『実際に訪問できたのは2件だけですから、成功報酬はゼロですね』",
    choices: [
      { text: "そんなの納得できません…", nextText: 9 },
      { text: "それでも5万円だけでも受け取る", nextText: 6 }
    ]
  },
  {
    id: 9,
    text: "B：『アポ獲得数という契約目標は達成してます。訪問に至らないのはA社の問題では？』",
    choices: [
      { text: "弁護士に相談する（bonobo加入）", requiredState: s => s.bonobo, nextText: 4 },
      { text: "反論する（bonobo未加入）", requiredState: s => !s.bonobo, nextText: 6 }
    ]
  },
  {
    id: 10,
    text: "新たな契約先の候補が現れた。念のため、反社チェックをする？",
    choices: [
      { text: "反社チェックを実行", nextText: 11 },
      { text: "面倒だからスキップ", nextText: 12 }
    ]
  },
  {
    id: 11,
    text: "調査結果：過去にトラブル歴あり！契約を見送ったことで損害を防げた。グッド分岐！",
    choices: [
      { text: "次へ進む", nextText: 13 }
    ]
  },
  {
    id: 12,
    text: "契約後に問題発覚。信頼を失い損害発生。バッド分岐！",
    choices: [
      { text: "もう一度プレイ", nextText: 1 }
    ]
  },
  {
    id: 13,
    text: "A社との新契約をAIチェックにかける？",
    choices: [
      { text: "AIチェックする", nextText: 14 },
      { text: "不要！自分で読んで確認", nextText: 15 }
    ]
  },
  {
    id: 14,
    text: "不利な条項を発見！修正提案して契約成功。グッド分岐！",
    choices: [
      { text: "さらに進む", nextText: 5 }
    ]
  },
  {
    id: 15,
    text: "見落としで報酬カット条項に同意していた…バッドエンド！",
    choices: [
      { text: "もう一度プレイ", nextText: 1 }
    ]
  }
];

showTextNode(1);
