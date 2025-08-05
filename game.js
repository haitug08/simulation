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
      { text: "加入していない", setState: { bonobo: false }, nextText: 3 },
    ]
  },
  {
    id: 2,
    text: "弁護士にすぐ相談できた！どうする？",
    choices: [
      { text: "弁護士に交渉を依頼する", nextText: 4 },
      { text: "裁判を起こす", nextText: 5 },
    ]
  },
  {
    id: 3,
    text: "自力でどうにかするしかない…。どうする？",
    choices: [
      { text: "A社に直接抗議する", nextText: 6 },
      { text: "SNSで晒す", nextText: 7 },
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
  }
];

showTextNode(1);
