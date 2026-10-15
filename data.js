'use strict';
const WORLD={
 ward:{name:'대피소',art:'ward',x:14,y:69,links:['square','clinic'],text:'침대 아래에 젖은 작업화가 놓여 있다. 창밖의 바다는 회색인데, 파도는 멀리 방파제에 부딪힐 뿐 이 방까지 들리지 않는다. 손목표에는 이름 대신 0417이 적혀 있다.'},
 square:{name:'중앙 광장',art:'town',x:34,y:57,links:['ward','clinic','school','market'],text:'비에 젖은 광장 한가운데서 대피 방송이 반복된다. 버스 정류장에 남은 여자가 지나가는 사람의 얼굴을 하나씩 확인한다. 그녀의 손에도 네 것과 비슷한 단말기가 있다.'},
 clinic:{name:'약국',art:'clinic',x:44,y:74,links:['ward','square','pier'],text:'약 봉투가 흩어진 조제대 뒤에 작은 처치실이 있다. 침대 시트는 최근에 갈아 끼웠다. 누군가 여기서 다친 사람을 돌봤다. 서랍에는 네 손목표와 같은 번호가 붙어 있다.'},
 hall:{name:'마을회관',art:'hall',x:44,y:24,links:['school','station','relay','forest'],text:'접이식 침대와 작업 책상이 한 방에 놓여 있다. 회관은 임시 대피소이자 통신 점검반의 작업 본부였다. 책상 위에는 작업자 출입 기록과 대피조 명부가 따로 있다.'},
 school:{name:'학교',art:'board',x:25,y:37,links:['square','hall','station'],text:'학교는 마지막 대피조의 집결지였다. 게시판에는 통과 규칙이 남아 있다. 이름을 크게 부르지 말 것. 녹색 문은 한 명, 청색 문은 등록한 동행자 전원. 복도 안쪽에서 금속을 두드리는 소리가 난다.'},
 station:{name:'폐역',art:'station',x:13,y:17,links:['school','hall'],text:'작은 점검차가 플랫폼 끝에 서 있다. 의자 밑에 작업 열쇠가 보인다. 승강장 반대편에서는 사람이 무릎을 굽힌 채 같은 안내를 계속 듣고 있다.'},
 market:{name:'폐시장',art:'market',x:52,y:59,links:['square','pier','relay'],text:'빈 천막 사이에 생수와 의료 가방이 남아 있다. 걸린 우비는 바람에 흔들리는데, 맨 끝의 우비만 바람이 멎어도 움직인다.'},
 pier:{name:'부두',art:'pier',x:70,y:78,links:['clinic','market','lighthouse'],text:'계류줄에 묶인 작은 배가 있다. 시동은 꺼졌지만 배 안은 말라 있다. 방파제 끝 붉은 불빛과 먼바다의 흰 불빛이 서로 다른 간격으로 깜박인다.'},
 lighthouse:{name:'등대',art:'lighthouse',x:89,y:82,links:['pier','reservoir'],text:'렌즈 옆 점검판에는 외항 신호가 적혀 있다. 흰색 세 번, 긴 점멸 한 번. 아래의 정비 서랍에는 반사판이 들어 있다.'},
 relay:{name:'중계실',art:'relay',x:63,y:43,links:['hall','market','reservoir','substation'],text:'네 손은 처음 보는 전원함의 걸쇠를 망설임 없이 찾는다. 책상에는 잘린 녹음과 원본 테이프가 나란히 있다. 벽 너머에서 단말기와 같은 목소리가 들린다.'},
 substation:{name:'변전소',art:'substation',x:75,y:21,links:['relay','forest'],text:'회로판에는 세 개의 손잡이가 있다. 점검판은 간단하다. 부하 분리, 우회선 연결, 대피 전원 연결. 순서를 건너뛰면 손잡이에 전류가 흐른다.'},
 reservoir:{name:'저류조',art:'reservoir',x:86,y:51,links:['relay','lighthouse'],text:'벽의 수위계 아래로 점검 통로가 이어진다. 낮은 밸브로 수위를 줄인 뒤 전력으로 펌프를 켜야 한다. 물 아래에서 무엇인가 난간을 긁는다.'},
 forest:{name:'해송 숲',art:'forest',x:57,y:7,links:['hall','substation'],text:'숲 관리소로 이어지는 전선이 끊어져 있다. 회관에서 본 노란 약 봉투가 나뭇가지에 걸려 있다. 길 안쪽에서 네 동료와 닮은 목소리가 이름을 부른다.'}
};
const PEOPLE={
 서진:{asset:'seojin',goal:'동생 해원을 찾는다',device:'해원 위치를 묻고 답을 종이에 옮겨 적는다',home:'square',destination:'school',secret:'해원에게 관리소로 가라고 부탁한 일을 숨겼다.',memory:'헤어지면 파란 우체통에서 기다리자고 약속했다.'},
 도윤:{asset:'doyun',goal:'대피 설비를 고치고 나간다',device:'수리 안내와 실제 계기를 비교한다',home:'school',destination:'station',secret:'다친 손을 숨겨 수리 중 실수할까 두려워한다.',memory:'선반은 밧줄로 묶고 오른쪽부터 들어 올렸다.'},
 나래:{asset:'skeptic',goal:'다시 누구도 잘못된 길로 보내지 않는다',device:'전원을 끄고 본인이 들었던 안내를 기록한다',home:'ward',destination:'hall',secret:'이전에는 붉은 신호가 구조선이라고 믿고 방송했다.',memory:'첫 만남에 네 단말기를 회색 천으로 덮었다.'},
 수호:{asset:'devotee',goal:'자신의 대피 기록을 지키려 한다',device:'끊임없이 안내를 물으며 기계를 손에서 놓지 않는다',home:'hall',destination:'relay',secret:'정말로 단말기의 안내 덕분에 한 번 살아남았다.',memory:'너에게 따뜻한 물을 건넸고 기계를 두 손으로 감쌌다.'},
 해원:{asset:'haewon',goal:'관리소의 부상자를 돕고 돌아온다',device:'배터리가 꺼져 수신 기록만 남아 있다',home:'forest',destination:'hall',secret:'회관에서 대피 완료로 잘못 처리됐지만 관리소에 남았다.',memory:'약 봉투 안에 언니에게 줄 작은 조개를 넣어 두었다.'},
 윤서:{asset:'operator',goal:'마지막 통신을 끊고 생존자를 내보낸다',device:'중계실 유선 장치로 ECHO 채널에 접속한다',home:'relay',destination:'hall',secret:'대피 중 신호 출력을 높여 모방 목소리가 퍼지게 했다.',memory:'네게 첫 안내에서 이름을 말하지 말고 손목 번호만 확인하라고 했다.'}
};
const ITEMS={med:{name:'구급상자',icon:'med',desc:'1개로 한 부위를 치료하거나 체력 35를 회복한다.'},filter:{name:'차폐 필터',icon:'filter',desc:'침식 25 감소. 이미 완전히 변한 몸까지 되돌리지는 못한다.'},food:{name:'식량',icon:'food',desc:'체력 12 회복. 동료와 나누면 관계도 회복한다.'},battery:{name:'예비 배터리',icon:'battery',desc:'배나 외부 신호 장치에 사용할 수 있다.'},rope:{name:'밧줄',icon:'rope',desc:'구조와 배수로 하강에 사용한다.'},fuel:{name:'연료',icon:'fuel',desc:'구조정 한 척을 움직일 양.'},key:{name:'배수문 열쇠',icon:'key',desc:'중계실 아래 점검문을 연다.'},rail:{name:'점검차 열쇠',icon:'rail',desc:'폐역의 점검차를 움직인다.'},mirror:{name:'반사판',icon:'mirror',desc:'목소리 대신 빛으로 구조 신호를 보낸다.'},keeperKey:{name:'관리소 열쇠',icon:'key',desc:'회관에서 가져온 숲 관리소 열쇠.'}};
// Evidence is physical unless digital:true. Its truth never rerolls.
const CLUES={
 wrist:{title:'0417 손목표',kind:'사실',text:'이름 칸은 비었고 0417이라는 번호만 남아 있다.',question:'내 번호 0417은 무엇을 뜻해?'},
 treatment:{title:'약국의 치료 기록',kind:'사실',text:'0417번 환자를 회관 작업반에서 옮겼다. 머리에 충격을 받았고 구조 중 손을 다쳤다는 기록이다.',question:'나는 왜 회관에서 약국으로 옮겨졌어?'},
 job:{title:'통신 점검 작업일지',kind:'사실',text:'통신 점검을 맡은 외부 작업자의 기록이다. 이름 칸은 물에 번져 읽기 어렵다. 서명의 모양이 내가 쓴 글씨와 닮았다.',question:'이 작업일지는 내가 쓴 거야?'},
 group:{title:'마지막 대피조 명부',kind:'사실',text:'이 명부는 마을 전체가 아닌 마지막 대피조 23명의 기록이다. 해원은 대피 완료로 표시됐지만 서명이 없다.',question:'해원은 정말 밖으로 나갔어?'},
 schoolTrail:{title:'학교의 노란 약 봉투',kind:'사실',text:'해원은 학교에서 약을 받아 숲 관리소로 향했다. 봉투에 관리소 출입 번호가 적혀 있다.',question:'해원이 숲 관리소에 간 이유가 뭐야?'},
 rules:{title:'학교의 통과 규칙',kind:'사실',text:'녹색 문은 한 사람, 청색 문은 명부에 등록된 사람 전원. 이름 대신 임시 번호를 입력한다.',question:'녹색 문과 청색 문은 어떻게 달라?'},
 photo:{title:'해원의 필름 사진',kind:'사실',text:'회관 작업반 사진에 나와 닮은 사람과 헤드폰을 쓴 여자가 함께 있다. 해원은 노란 우비를 입었고 봉투 안의 조개를 보여 주고 있다.',question:'사진 속 헤드폰을 쓴 사람은 누구야?'},
 identity:{title:'원본 작업 카드',kind:'사실',text:'이현, 외부 통신 기사. 손목 번호와 회관 서명, 필름 사진이 같은 사람을 가리킨다.'},
 confession:{title:'윤서의 증언',kind:'주장',text:'윤서는 구조 방송을 멀리 보내려 신호 출력을 높였다고 말한다. 주인공은 이를 끊으려다가 부상을 입었다.'},
 original:{title:'끊기지 않은 원본 녹음',kind:'사실',text:'출력을 높인 시각과 이를 중단하라고 요청하는 작업자의 목소리가 남아 있다. 이후 다른 장치에서 같은 목소리로 다른 안내가 흘러나온다.',question:'누가 내 목소리로 방송을 한 거야?'},
 tide:{title:'부두 수위표',kind:'사실',text:'붉은 불빛은 암초 경고. 외항은 흰 불빛이다. 낮은 물때에는 부두 끝의 계류줄을 풀 수 있다.',question:'붉은 불빛과 흰 불빛 중 어디로 가야 해?'},
 beacon:{title:'등대 점멸 기록',kind:'사실',text:'흰색 세 번과 긴 점멸 한 번이 수위표의 외항과 일치한다.'},
 power:{title:'변전소 점검 표찰',kind:'사실',text:'부하 분리 → 우회선 → 대피 전원 순서로 연결했다.'},
 pump:{title:'저류조 점검 기록',kind:'사실',text:'낮은 밸브를 열고 전력을 연결하면 배수 통로가 드러난다.'},
 permit:{title:'회관 대피 승인',kind:'사실',text:'현재 살아 있는 사람의 임시 번호를 학교 문에 등록할 수 있다. 원래 명부의 완료 표시를 그대로 믿으면 안 된다.'},
 tickets:{title:'종이 배차표',kind:'사실',text:'폐역 점검차는 해안 밖 정비 터널로 이어진다. 전력과 수동 브레이크 확인이 필요하다.'},
 forestNote:{title:'숲 관리소의 메모',kind:'사실',text:'0417번 작업자가 남긴 메모다. 선을 건드리지 말고 약을 옮겨 달라는 부탁과 함께, 이곳에서 기다려 달라고 적혀 있다. 그 아래 다른 글씨가 덧붙었다. 돌아올 때까지 기다릴게요.'},
 footprint:{title:'젖은 바닥의 흔적',kind:'사실',text:'승객처럼 보이는 형체는 걸어도 물 위에 발자국을 남기지 않는다. 손은 같은 방송에 맞춰 움직인다.',question:'저 사람은 왜 발자국을 남기지 않아?'},
 mirrorProof:{title:'필름과 반사의 일치',kind:'사실',text:'괴물처럼 보이던 동료가 필름 사진과 유리 반사에서는 평범한 모습이다. 두 기록은 단말기를 거치지 않았다.'},
 residual:{title:'이전 접속의 흔적',kind:'사실',digital:true,text:'이전 플레이에서 선택한 경로의 접속 기록이 남았다. 사람들의 시간이 되돌아간 증거는 아니다.'},
 archiveLog:{title:'회관의 숨겨진 보고서',kind:'사실',text:'장치는 피난자의 목소리를 학습해 안내를 흉내 냈다. 접속을 오래 유지한 사람에게 행동과 신체 변화가 발생했다.'}
};
const A=(id,label,opts={})=>({id,label,...opts});
const ACTIONS={
 ward:[A('wrist','손목표와 작업화를 살핀다',{clue:'wrist',text:'작업화 안쪽에는 소금기가 굳어 있다. 네 손은 끈 묶는 방법을 기억하지만, 신발 주인의 이름은 떠오르지 않는다.',say:'내 이름은 모르겠어. 이 번호부터 확인해야겠어.'}),A('firstMail','도착한 메시지를 읽는다',{effect:'firstMail',text:'단말기에서 낮고 조심스러운 목소리가 들린다. “깨어났어요? 문을 잠그고 손목 번호만 확인해요. 이름은 말하지 마세요.”'}),A('firstSave','목소리가 알려준 점검문을 확인한다',{needFlag:'firstMail',effect:'firstSave',text:'복도 쪽 손잡이가 돌아간다. 너는 작은 점검문으로 몸을 빼낸다. 문 너머를 지나가는 형체는 발소리만 남긴다. 이번 안내는 네 목숨을 구했다.'}),A('nara','복도에서 단말기를 가리는 여자를 만난다',{needFlag:'firstSave',npc:'나래',text:'여자는 나래라고 한다. 네 기계를 회색 천으로 덮는다. “말을 듣지 말라는 게 아니야. 나도 그 말을 믿고 사람을 잘못 보냈어.”'}),A('naraPast','나래에게 방송 일을 묻는다',{needMet:'나래',cycle:2,text:'나래는 천을 내려다본다. “붉은 불빛이 구조선이라고 방송한 건 나야. 확인할 수 있었는데 안 했어.”',effect:'naraPast'})],
 clinic:[A('treatment','0417번 환자의 치료 기록을 읽는다',{clue:'treatment',text:'환자를 옮긴 곳은 마을회관이다. 누가 네 몸을 돌봤는지, 그곳에서 확인할 수 있을 것 같다.'}),A('meds','응급 가방을 챙긴다',{gain:['med','med','battery'],text:'구급상자 두 개와 예비 배터리 한 개가 남아 있다. 가방을 비운 뒤에도 출입문은 열려 있다.'}),A('healHere','처치실에서 부상을 치료한다',{repeat:true,effect:'treatmentMenu',text:'어느 부위를 치료할지 살핀다.'})],
 square:[A('seojin','사람들의 얼굴을 확인하는 여자에게 말을 건다',{npc:'서진',text:'“동생 해원을 찾고 있어요. 단말기는 나갔다고 하는데, 나갔다면 왜 나에게 연락하지 않죠?” 서진은 답변을 종이에 적어 비교하고 있다.'}),A('mapBoard','광장의 안내 지도를 살핀다',{effect:'mapBoard',text:'학교는 대피 집결지, 회관은 작업 본부였다. 치료 기록을 찾았다면 회관으로 가야 한다. 시장과 부두는 광장 아래에 있다.'})],
 hall:[A('job','작업자 출입 기록과 서명을 비교한다',{clue:'job',text:'펜을 잡고 선을 그어 본다. 기록의 서명과 손의 움직임이 닮았다. 이름은 잉크가 번져 읽을 수 없다. 닮은 서명만으로 내 기록이라고 확신할 수는 없다.'}),A('group','마지막 대피조 명부를 확인한다',{clue:'group',text:'23명은 마을 전체 인원이 아니다. 해원의 완료 표시만 서명이 없다. 학교에서 마지막 행적을 확인할 수 있다.'}),A('photo','작업반의 필름 사진을 살핀다',{clue:'photo',text:'사진 속 너는 헤드폰을 쓴 여자와 전원함을 들고 있다. 뒤에서 해원이 작은 조개를 보여 준다.'}),A('permit','현재 생존자의 대피 승인을 확보한다',{clue:'permit',needClue:'group',text:'완료 표시를 지우고 실제로 만난 사람의 번호를 적는다. 명부는 사람을 대신하지 않는다.'}),A('key','숲 관리소 열쇠를 챙긴다',{gain:['keeperKey'],needClue:'schoolTrail',text:'해원이 향했던 관리소의 열쇠를 찾는다. 숲으로 갈 이유가 분명해졌다.'}),A('suho','단말기를 두 손으로 감싼 남자와 대화한다',{npc:'수호',text:'수호가 따뜻한 물을 건넨다. “이 목소리가 물이 찰 때 내게 사다리 위치를 알려 줬어요. 거짓말이라는 말만으로 버릴 수는 없어요.” 손목 안쪽에는 가는 검은 선이 있다.'}),A('report','잠긴 보고서 서랍을 조사한다',{cycle:2,clue:'archiveLog',text:'이전 접속에서 알아낸 서랍 번호를 사용한다. 보고서는 기억을 학습한 장치가 안내와 사람을 흉내 내기 시작했다고 적고 있다.'})],
 school:[A('rules','게시판의 통과 규칙을 읽는다',{clue:'rules',text:'같이 나갈 사람을 두고 녹색 문을 사용하면 한 명만 나간다. 청색 문에는 실제 동행자 번호가 필요하다.'}),A('trail','노란 약 봉투와 대피 자리표를 조사한다',{clue:'schoolTrail',text:'해원은 관리소의 부상자에게 약을 가져갔다. 대피 완료 표시를 남긴 사람은 해원이 아니다.'}),A('rope','구조용 밧줄을 챙긴다',{gain:['rope'],text:'체육관의 구조 가방에서 밧줄을 찾는다.'}),A('doyun','무너진 선반 아래의 사람을 돕는다',{npc:'도윤',needItem:'rope',text:'밧줄로 선반 오른쪽을 묶어 들어 올린다. 도윤은 다친 손을 감춘 채 일어난다. 그의 단말기에는 전력 복구 안내가 떠 있다.'}),A('schoolEscape','비상문으로 탈출을 시도한다',{escape:'school',repeat:true}),A('schoolUnsafe','기록에서 알아낸 본명을 방송에 말하고 문을 연다',{needClue:'identity',effect:'nameRisk',repeat:true,cost:'목소리를 내보냄'})],
 pier:[A('tide','수위표와 경고등을 확인한다',{clue:'tide',text:'붉은 불빛은 암초 경고다. 흰 표식이 외항이다. 등대에서 간격을 확인해야 배가 갈 길을 정할 수 있다.'}),A('fuel','배의 연료통을 확보한다',{gain:['fuel'],text:'연료는 남아 있다. 배의 전원과 항로 검증을 마치면 출항할 수 있다.'}),A('seaEscape','배를 타고 탈출을 시도한다',{escape:'sea',repeat:true}),A('redEscape','붉은 불빛만 믿고 출항한다',{effect:'redRisk',needItem:'fuel',cost:'확인하지 않은 항로'})],
 lighthouse:[A('beacon','수위표와 흰 신호의 간격을 대조한다',{needClue:'tide',clue:'beacon',text:'흰색 세 번, 긴 점멸 한 번. 표지와 실제 빛이 일치한다.'}),A('mirror','정비 서랍에서 반사판을 꺼낸다',{gain:['mirror'],physical:'arm',text:'네 목소리를 내보내지 않고도 구조선을 부를 수 있다.'}),A('lightEscape','반사판으로 외부 구조선을 부른다',{escape:'light',repeat:true})],
 market:[A('food','생수와 식량을 챙긴다',{gain:['food','food'],text:'최근에 누군가 봉투를 열었다. 물병에는 아직 온기가 없다.'}),A('medical','의료 가방에서 구급상자와 필터를 챙긴다',{gain:['med','filter'],text:'치료 물품은 한정되어 있다. 필터는 단말기 신호를 줄이고, 구급상자는 몸을 치료한다.'}),A('rest','불 꺼진 가게에서 잠깐 쉰다',{effect:'rest',text:'화면에서 시선을 떼고 소리에 집중한다. 동료들도 자기 기계를 내려놓는다.'})],
 substation:[A('powerStart','점검판을 읽고 부하를 분리한다',{effect:'powerStart',text:'램프가 꺼진다. 다음은 우회선을 연결하는 단계다.'}),A('powerBypass','우회선을 연결한다',{needFlag:'powerStart',effect:'powerBypass',physical:'arm',text:'대피 회로로 전류를 보낼 준비가 됐다.'}),A('powerFinish','대피 전원을 연결하고 점검 표찰을 챙긴다',{needFlag:'powerBypass',clue:'power',physical:'arm',text:'순서대로 연결하자 전원이 안정된다. 학교 문과 배수 펌프를 사용할 수 있다.'}),A('powerWrong','부하를 끊지 않고 전원을 연결한다',{effect:'shock',cost:'감전 위험'})],
 reservoir:[A('lowValve','낮은 밸브를 열어 수위를 줄인다',{physical:'arm',effect:'lowValve',text:'밸브를 열자 수위계의 바늘이 조금 내려간다. 아직 통로 전체가 드러나지는 않았다. 펌프 전원을 확인해야 한다.'}),A('pump','승인된 전원으로 펌프를 켠다',{needFlag:'lowValve',needClue:'power',clue:'pump',text:'물살이 멎는다. 중계실의 열쇠로 아래 방수문을 열 수 있다.'}),A('drainUnsafe','물 아래 문을 확인하지 않고 내려간다',{effect:'drownRisk',cost:'수위 미확인 위험'}),A('drainEscape','점검 통로로 탈출을 시도한다',{escape:'drain',repeat:true})],
 station:[A('rail','점검차의 열쇠와 배차표를 챙긴다',{gain:['rail'],clue:'tickets',text:'바깥 정비 터널은 대피 방송과 별개다. 수동 브레이크와 전력이 필요하다.'}),A('victim','발자국 없는 승객을 멀리서 관찰한다',{clue:'footprint',effect:'victim',text:'“여기가 출구라고 했어.” 승객은 같은 말을 반복한다. 팔과 고개는 방송에 맞춰 서로 다른 박자로 움직인다. 그 화면에는 붉은 항로가 떠 있다.'}),A('railFix','점검차 브레이크를 정비한다',{physical:'arm',effect:'railFix',text:'손잡이가 걸리지 않고 돌아간다. 철로는 바깥 정비소로 이어진다.'}),A('railEscape','점검차로 탈출을 시도한다',{escape:'rail',repeat:true})],
 forest:[A('haewon','약 봉투를 따라 관리소를 연다',{needItem:'keeperKey',npc:'해원',clue:'forestNote',text:'해원은 부상자를 돌보며 네가 돌아오기를 기다렸다. 그녀의 기계는 꺼져 있다. “선을 만지지 말고 약만 가져오라고 했잖아요. 기억이 안 나요?”'}),A('shell','해원에게 봉투 안의 조개를 보여 달라고 한다',{needMet:'해원',needClue:'photo',effect:'haewonProof',text:'사진에서 본 작은 조개가 나온다. “언니에게 주려고요.” 해원은 학교에서 네가 보지 못했던 일을 순서대로 설명한다.'}),A('forestMemo','관리소 책상의 마지막 작업 메모를 읽는다',{clue:'forestNote',needItem:'keeperKey',text:'메모에는 네가 중계실로 돌아가 통신을 끊으려 했다고 적혀 있다.'}),A('forestExit','관리소 뒤 외부 점검길을 확인한다',{cycle:2,escape:'forest',repeat:true})],
 relay:[A('identity','원본 작업 카드와 서명을 대조한다',{clue:'identity',needClue:'job',needClue2:'photo',text:'작업 카드의 사진, 손목 번호, 회관 서명이 맞아떨어진다. 네 이름은 이현이다. 통신 점검을 위해 이 마을에 들어왔다.'}),A('tape','잘리지 않은 원본 녹음을 듣는다',{clue:'original',physical:'hearing',text:'“출력을 낮춰요. 다른 장치가 목소리를 가져가고 있어요.” 녹음 속 네 말 뒤에 윤서의 대답이 남았다. 네 목소리를 흉내 낸 방송은 그 뒤에 시작됐다.'}),A('key','아래 점검문 열쇠를 챙긴다',{gain:['key'],text:'방수문은 저류조로 이어진다.'}),A('operator','벽 너머의 응답자와 직접 만난다',{needClue:'identity',npc:'윤서',clue:'confession',text:'헤드폰을 쓴 여자가 손목 붕대를 감으며 나온다. “윤서예요. 처음에 문을 잠그라고 한 사람.” 그녀는 네 기억이 돌아왔는지 먼저 묻는다.'}),A('operatorProof','첫 안내와 원본 녹음의 일을 윤서에게 묻는다',{needMet:'윤서',needClue:'original',effect:'operatorProof',text:'윤서는 첫 안내의 손목 번호와 점검문의 위치를 기억한다. 출력 증가도 인정한다. 숨긴 사실은 있었지만 원본의 목소리와 행동은 맞아떨어진다.'}),A('echoCut','외부 연락을 확보한 뒤 마을 송신을 끊는다',{needClue:'original',needFlag:'operatorProof',effect:'echoCut',text:'통신은 구조 거점의 유선 회선으로 넘어간다. 지금부터 단말기를 꺼도 외부에서 너희의 위치를 알 수 있다.'}),A('operatorEscape','윤서와 외부 정비 터널로 나간다',{escape:'operator',repeat:true}),A('stay','남아 있는 사람을 위해 송신실에 남는다',{effect:'stay',needFlag:'operatorProof'})]
};
const ENDS=[
 ['sea','흰 불빛의 아침','바다의 표지와 실제 신호를 확인해 항구를 벗어났다.'],['seaTogether','함께 묶은 계류줄','동료와 역할을 나누고 같은 배에 올라 외부 구조 거점에 닿았다.'],['schoolSolo','한 사람의 문','녹색 문을 통과했다. 누구를 남겼는지는 문 밖에서도 기억해야 한다.'],['schoolTogether','다시 쓴 명부','기록 대신 실제로 함께 온 사람의 번호를 등록하고 나왔다.'],['drain','물 아래의 출구','밸브와 전력을 확인하고 조용한 점검 통로를 벗어났다.'],['drainTogether','서로 잡은 손','부상자를 부축하며 마지막 사다리를 함께 올랐다.'],['rail','방송 없는 막차','낡은 점검차가 바깥 정비소에 멈췄다. 행선지는 종이에 남아 있었다.'],['light','말하지 않은 구조 신호','반사판의 빛을 본 구조선이 들어왔다. 누구의 목소리도 빌리지 않았다.'],['forest','이전에 놓친 길','알고 있던 표식으로 관리소 뒤 점검길을 확인했다.'],['operator','목소리의 주인','윤서의 말과 원본 기록을 대조하고 실제 응답자와 나왔다.'],['dark','꺼진 화면 너머','단말기의 연결을 끊은 채 실물 표지와 사람의 행동을 확인하고 나왔다.'],['earned','의심 끝의 아침','서로 다른 안내를 증거로 대조하고 사건의 원인을 확인했다.'],['trueSight','내 눈을 의심한 사람','정상인 동료를 잘못 보았음을 확인하고 시야를 되찾았다.'],['falseSight','문 밖에도 남은 그림자','마을은 나왔지만 자신의 시야를 확인하지 않아 구조자의 손도 위협으로 보였다.'],['mimic','같은 얼굴의 다른 사람','재회한 존재의 불일치를 외면했다. 문 밖에서 그가 처음 나눴던 대화를 다시 틀린다.'],['changedCompanion','끝나지 않은 동행','변해가는 동료를 함께 데리고 나왔다. 구조 거점에서 치료와 격리가 시작된다.'],['changedSelf','문 밖의 낯선 몸','몸의 변화는 남아 있다. 탈출과 회복은 같은 일이 아니었다.'],['haewon','남은 한 사람','완료 표시를 믿지 않고 해원을 찾아 언니와 함께 나왔다.'],['reconcile','돌아온 약속','떠난 동료와 다시 만났고, 말이 아닌 행동으로 신뢰를 회복했다.'],['disclosure','남긴 증거','자신에게 불리한 기록까지 외부에 전달했다. 사건은 실종으로 덮이지 않았다.'],['stay','마지막 연결의 사람','너는 남은 사람을 위해 유선 안내를 이어간다. 출구를 알지만 지금은 떠나지 않는다.'],['name','너를 부르는 방송','본명을 부른 목소리를 따라가자 같은 이름의 대답이 여러 문에서 들린다.'],['reef','붉은 불빛 아래','암초 경고를 구조 신호로 믿었다. 마지막에 수위표의 뜻을 알아챘지만 배를 돌릴 수 없었다.'],['caught','돌아보지 못한 복도','발소리가 멎었는데도 계속 움직였다. 문턱에서 긴 손이 너를 붙잡는다.'],['drowned','차오른 통로','수위를 확인하지 않은 채 내려갔다. 사다리 아래 물이 올라온다.'],['signal','다음 안내의 목소리','연결을 끊을 마지막 기회를 넘겼다. 이제 네 목소리가 다음 사람을 맞는다.'],['assault','믿었던 손의 공격','재회한 존재의 경고를 무시한 채 등을 보였다. 도울 사람이 남지 않았다.'],['exhausted','남은 힘이 없었다','마지막 처치와 부축의 기회를 놓쳤다. 누군가 지나가지만 너는 답하지 못한다.']
].map(([id,title,text],i)=>({id,n:i+1,title,text}));
const TRUTH=[
 ['사건 전날','유리만의 통신망이 실종자의 목소리로 안내를 반복한다. 외부 기사 이현이 점검 요청을 받고 회관에 도착한다.'],
 ['점검 당일 오후','통신 담당자 윤서는 주민을 대피시키려 장치의 출력을 높인다. 목소리 학습 장치가 여러 기기로 연결되며 신체와 판단에 영향을 준다. 윤서는 위험을 늦게 인정했다.'],
 ['대피 중','나래는 붉은 불빛을 구조 신호로 오해해 방송한다. 일부 주민은 암초 쪽으로 향한다. 수호는 올바른 사다리 안내로 살아남아 단말기를 믿게 된다.'],
 ['해원의 행적','서진의 부탁과 이현의 작업 요청을 받아 해원은 관리소에 약을 옮긴다. 명부 담당자는 그녀가 떠난 것을 대피한 것으로 오인한다. 해원은 마을 안에 남았다.'],
 ['이현의 마지막 작업','이현은 학습된 목소리가 다른 장치에서 재생되는 것을 알아채고 송신을 끊으려 한다. 작업 중 머리를 다쳐 약국으로 옮겨지고, 이후 대피소에서 깨어난다. 기억이 사라진 원인은 부상과 침식이 겹친 결과다.'],
 ['단말기의 응답자','첫 점검문 안내를 한 사람은 윤서다. 다른 기기에서 오는 일부 답변은 오래된 수신, 잘못된 판단, 의도적인 은폐 또는 모방된 목소리다. 실제 응답자가 있다는 사실이 모든 메시지의 진실을 보장하지 않는다.'],
 ['남아 있는 존재','주요 인물은 본래 인간이다. 오래 연결된 사람은 변할 수 있고, 별도의 모방체가 떠난 사람의 외형을 흉내 낸다. 각 플레이에서 모방체의 접근과 진행 상태는 달라도 사건의 원인은 바뀌지 않는다.'],
 ['탈출 이후','실물 증거와 원본 녹음을 가져오면 외부 거점에서 신원과 사건을 확인할 수 있다. 함께 나온 존재의 상태는 마을에서 이미 결정돼 있다. 후일담은 이를 보여주며 다시 추첨하지 않는다.'],
 ['다시 플레이한다는 것','각 플레이는 다른 선택의 가능성이다. 이전 접속의 기록 일부만 장치에 남고 플레이어는 그 지식을 활용한다. 죽은 사람들이 세계 안에서 되살아났다는 뜻은 아니다.']
];

CLUES.delay={title:'차단을 미룬 14분',kind:'사실',text:'이현은 관리소의 해원과 학교의 부상자 위치를 확인하려 송신 차단을 14분 미뤘다. 외부 회선을 따로 확보하자고 요청했지만 그동안 모방 신호도 퍼졌다.',question:'나는 왜 바로 연결을 끊지 않았어?'};
ACTIONS.relay.push(A('lastDecision','봉인된 비상 작업대에서 마지막 차단 결정을 읽는다',{cycle:3,needClue:'original',needClue2:'archiveLog',clue:'delay',text:'기록에는 네가 직접 차단을 미뤄 달라고 요청한 목소리가 있다. 사람을 구하려던 선택은 진짜였다. 그동안 다른 사람에게 신호가 퍼진 것도 진짜였다. 둘 중 하나만 기억하면 사건을 이해할 수 없다.'}));
TRUTH.splice(5,0,['차단을 미룬 이유','이현은 관리소와 학교에 남은 사람의 위치를 확인하려 차단을 14분 미뤘다. 별도의 외부 회선을 확보하려는 요청은 늦게 처리됐다. 구하려던 의도와 피해가 커진 결과는 함께 존재한다.']);

// v5.3 editorial and exploration consistency.
PEOPLE.서진.memory='헤어지면 광장의 파란 우체통에서 기다리기로 해요.';PEOPLE.도윤.memory='선반 오른쪽을 밧줄로 묶어서 꺼내 줬죠. 그 매듭을 기억해요.';PEOPLE.나래.memory='이 회색 천으로 화면을 가린 건 소리를 줄이려던 거야.';PEOPLE.수호.memory='따뜻한 물을 건넸을 때도 기계는 두 손으로 잡고 있었어요.';PEOPLE.해원.memory='약 봉투 안에 언니에게 줄 작은 조개를 넣었어요.';PEOPLE.윤서.memory='처음에 이름을 말하지 말고 손목 번호만 확인하라고 했어요.';
ACTIONS.hall.find(a=>a.id==='key').needClue=undefined;
ACTIONS.forest.find(a=>a.id==='haewon').text='관리소 안에서 노란 우비를 입은 여자가 몸을 일으킨다. 약 봉투와 물병이 발치에 놓여 있다. 그녀의 단말기는 꺼져 있다. “선을 건드리지 말고 약만 가져오라고 했잖아요. 정말 기억이 안 나요?”';
ENDS.find(e=>e.id==='reef').text='붉은 불빛을 향해 배를 몰았다. 파도가 갈라지는 사이로 암초가 드러난다. 불빛은 구조선의 안내가 아니라 위험을 알리는 경고였다. 배를 돌리기엔 이미 너무 가까웠다.';

// Details remain understandable when evidence is found in a different order.
WORLD.forest.text='해송 숲 안쪽으로 끊어진 전선이 이어진다. 노란 약 봉투가 나뭇가지에 걸려 있고, 낮은 관리소 지붕이 그 뒤로 보인다. 길 안쪽에서 익숙한 목소리가 이름을 부른다. 발자국은 네가 온 길에만 남아 있다.';
ACTIONS.ward.find(a=>a.id==='naraPast').speaker='나래';
ACTIONS.forest.find(a=>a.id==='shell').speaker='해원';
ACTIONS.square.find(a=>a.id==='mapBoard').text='지도의 실선은 걸어서 이어지는 길이다. 학교 옆으로 회관과 폐역이 있고, 시장 뒤 길은 중계실로 이어진다. 항구 쪽으로 돌아가거나 중계실을 지나 숲으로 갈 수도 있다. 치료 기록에는 회관에서 환자를 옮겼다고 적혀 있다.';
ACTIONS.hall.find(a=>a.id==='photo').text='필름 사진 한 귀퉁이에 0417이라는 작업 번호가 적혀 있다. 그 옆 사람의 얼굴과 작업복이 너와 닮았다. 그는 헤드폰을 쓴 여자와 전원함을 들고 있다. 뒷면에는 노란 우비를 입은 여자의 이름이 해원이라고 적혀 있다. 그녀의 손에는 작은 조개가 있다.';
ACTIONS.market.find(a=>a.id==='food').text='생수 두 병과 마른 식량이 남아 있다. 한 봉투는 최근에 뜯긴 듯하고, 물병 옆에는 젖은 손자국이 있다. 누군가 먼저 이곳을 지나갔다.';

// v5.4: creatures occupy the foreground and alter actual encounter choices.
const MONSTERS={
 schoolThreat:{key:'school',name:'종지기',ending:'schoolTaken',tell:'스피커가 딸깍거릴 때만 손끝이 움직인다. 발을 멈추자 손도 멈춘다.',blocked:'복도 출입문으로 돌아간다',close:'길게 늘어난 손이 출입문을 눌러 닫는다. 발소리를 낼수록 손끝이 가까워진다.',safe:'still',safeLabel:'발을 멈추고 방송이 끊긴 틈에 점검문으로 빠진다',risk:'dash',riskLabel:'스피커가 켜진 동안 복도를 가로질러 뛴다',trueHelp:'스피커가 켜질 때 손이 움직여요. 문을 당기기 전에 발을 멈추고, 소리가 끊기는 틈을 확인해요.',falseHelp:'괜찮아요. 손은 문 쪽에 있어요. 스피커가 켜졌을 때 곧장 뛰면 지나갈 수 있어요.'},
 forestThreat:{key:'forest',name:'빌린 목소리',ending:'forestTaken',tell:'노란 우비는 떠 있는데 그 아래 발자국은 없다. 반대쪽으로는 약 봉투 조각과 작은 발자국이 이어진다.',blocked:'목소리가 들리는 오솔길로 돌아간다',close:'나뭇가지처럼 갈라진 팔이 오솔길을 가로막는다. 네가 한 말을 빈 우비 안에서 되풀이한다.',safe:'trail',safeLabel:'발자국과 약 봉투가 이어진 낮은 길로 물러난다',risk:'voice',riskLabel:'익숙한 목소리의 이름을 부르고 다가간다',trueHelp:'목소리보다 바닥을 봐요. 사람이 걸은 흔적이 이어진 쪽으로 가요. 이름에 대답할 필요는 없어요.',falseHelp:'그 사람도 무서워서 숨어 있는 거예요. 아는 이름을 불러 주면 길을 열어 줄 거예요.'},
 marketThreat:{key:'market',name:'눈먼 솔기',ending:'marketTaken',tell:'우비 틈의 손은 네가 고개를 돌릴 때 가까워진다. 계속 보고 있으면 바닥의 그림자도 멎는다.',blocked:'천막 사이 지름길을 지난다',close:'천막의 솔기에서 여러 손이 나와 지름길을 덮는다. 등 뒤에서 우비 끄는 소리가 멎지 않는다.',safe:'watch',safeLabel:'형체를 시야에 둔 채 밝은 통로로 뒷걸음친다',risk:'turn',riskLabel:'고개를 돌리고 좁은 천막 틈으로 달린다',trueHelp:'천막이 아니라 손을 봐요. 보고 있을 때 멈춘다면 등을 보이지 말고 물러나요.',falseHelp:'당신 시선 때문에 따라오는 거예요. 눈을 돌리고 천막 사이로 빠르게 지나가요.'},
 waterThreat:{key:'water',name:'썰물의 손',ending:'waterTaken',tell:'물 위에 뜬 머리 아래 긴 팔이 난간까지 닿는다. 낮은 발판은 젖었지만 높은 계단에는 마른 발자국이 있다.',blocked:'낮은 발판을 밟고 건넌다',close:'물에서 올라온 손이 낮은 발판을 덮는다. 같은 손목에서 다시 긴 손가락이 펼쳐진다.',safe:'high',safeLabel:'마른 발자국이 있는 높은 계단으로 물러난다',risk:'jump',riskLabel:'젖은 낮은 발판으로 뛰어내린다',trueHelp:'낮은 발판까지 손이 닿아요. 마른 발자국이 남은 높은 계단을 먼저 봐요.',falseHelp:'높은 곳은 피할 길이 없어요. 손이 멎는 지금 낮은 발판으로 뛰어내리면 돼요.'}
};
for(const [id,title,text] of [
 ['schoolTaken','마지막 종이 울린 뒤','방송이 켜진 복도를 가로질러 손이 막은 문으로 뛰었다. 손잡이까지 닿았지만, 등 뒤에서 길어진 팔이 네 움직임을 먼저 붙잡았다.'],
 ['forestTaken','대답한 사람의 자리','발자국 없는 우비를 향해 이름을 불렀다. 네 이름을 되풀이하던 목소리가 멎고, 가지로 갈라진 팔이 돌아갈 길을 닫았다.'],
 ['marketTaken','우비 안의 빈자리','고개를 돌리고 천막 틈으로 몸을 밀어 넣었다. 보고 있을 때 멈췄던 손들이 한꺼번에 다가왔다. 네 그림자가 천막 안으로 끌려갔다.'],
 ['waterTaken','난간 아래 남은 번호','긴 손이 덮은 낮은 발판을 다시 밟았다. 물 위에 떠 있던 머리가 내려가자 계단을 잡고 있던 손도 함께 물 아래로 당겨졌다.']
])ENDS.push({id,title,text,n:ENDS.length+1});

TRUTH.splice(TRUTH.findIndex(([title])=>title==='탈출 이후'),0,['곳곳의 괴물','스피커 아래 긴 팔, 숲의 빈 우비, 시장의 겹친 손, 물 아래 형체는 같은 모방 신호가 서로 다른 몸과 물건에 남은 결과다. 침식된 사람과 그 흔적을 흉내 낸 존재가 함께 남았다. 얼굴이나 목소리가 닮았다는 이유만으로 사람을 판정할 수 없지만, 실제로 길을 막고 상처를 남기는 손을 환각이라고 넘길 수도 없다. 플레이어의 시야가 어긋나는 사건은 사진과 반사처럼 별도 흔적으로 구별한다.']);

// v5.5: reply to the player's actual question before proposing companionship.
ACTIONS.square.find(a=>a.id==='seojin').text='여자는 서진이라고 이름을 말한다. 손에 든 종이는 물에 젖지 않게 접어 두었다. “학교 체육관 앞에서 마지막으로 봤어요. 해원이 약을 가져다주고 오겠다고 했어요. 단말기는 밖으로 나갔다는데… 연락이 없어요.”';
PEOPLE.서진.memory='학교 체육관 앞에서 해원을 마지막으로 봤다고 말했어요.';

// v5.6: authored conversation beats, not independently concatenated introductory lines.
const INTRO_SCENES={
 서진:{text:'여자는 광장 쪽을 몇 번이나 돌아본다. 접어 둔 종이를 손에서 놓지 않는다.',dialogue:[{who:'나',text:'누굴 찾고 계세요? 저는 이름이 기억나지 않아요. 어떻게 불러 드리면 될까요?'},{who:'서진',text:'서진이라고 해요. 동생 해원을 찾고 있어요. 학교 체육관 앞에서 마지막으로 봤어요.'},{who:'서진',text:'기계는 밖으로 나갔다는데 연락이 없어요. 정말 나간 거면 제 연락에도 답했을 텐데.'}]},
 도윤:{text:'선반이 들리자 남자는 먼저 다친 손을 품에 넣는다. 잠깐 숨을 고른 뒤 몸을 일으킨다.',dialogue:[{who:'나',text:'천천히 나오세요. 손을 다쳤어요?'},{who:'도윤',text:'조금요. 괜찮… 아니, 혼자서는 못 나왔을 거예요. 고맙습니다. 도윤이에요.'}]},
 나래:{text:'여자가 회색 천으로 단말기 화면을 덮는다. 천을 잡은 손목에는 희미한 검은 자국이 있다.',dialogue:[{who:'나',text:'왜 가리는 거예요?'},{who:'나래',text:'잠깐만 내려놔. 방금 문 안 열었지? 그 소리에 대답한 사람은 돌아오지 않았어.'},{who:'나',text:'잠깐만요. 누구세요? 왜 내 단말기를 가리는 거예요?'},{who:'나래',text:'나래야. 이 마을에서 대피 방송을 했어. 그 기계 말을 믿고 사람들을 잘못 보낸 적이 있어.'},{who:'나',text:'방금은 저를 살려 줬어요. 무조건 끄라는 말인가요?'},{who:'나래',text:'아니. 도움이 될 때도 있으니까 더 어렵지. 들은 말과 네가 직접 본 걸 따로 적어 둬.'}]},
 수호:{text:'남자가 손잡이 있는 낡은 금속 컵을 내민다. 다른 손은 단말기를 꼭 쥐고 있다.',dialogue:[{who:'나',text:'물 고마워요. 어떻게 불러 드리면 될까요?'},{who:'수호',text:'네. 물이 찼을 때 이 목소리가 사다리 위치를 알려 줬어요. 수호라고 해요.'},{who:'수호',text:'그 뒤로는 끄기가 무서워요. 또 물이 차면 누구 말을 들어야 하죠?'}]},
 해원:{text:'노란 우비를 입은 여자가 의자에서 일어난다. 네 작업복을 보고 멈칫한다.',dialogue:[{who:'해원',text:'다시 오셨네요. 언니도 같이 왔어요?'},{who:'나',text:'저를 아세요? 먼저 이름을 알려 주실래요?'},{who:'나',text:'미안해요. 여기 왔던 일이 기억나지 않아요.'},{who:'해원',text:'저는 해원이에요. 여기서 언니를 기다리라고 메모를 남기고 가셨잖아요.'}]},
 윤서:{text:'헤드폰을 쓴 여자가 벽 너머에서 나온다. 가슴의 작업 명찰에는 통신 작업반 윤서라고 적혀 있다. 너를 보더니 붕대를 감던 손을 멈춘다.',dialogue:[{who:'나',text:'누구세요? 단말기에서 들었던 목소리 같은데요.'},{who:'윤서',text:'윤서예요. 처음에 문을 잠그라고 한 사람.'},{who:'나',text:'계속 당신이 대답한 건가요?'},{who:'윤서',text:'처음에는요. 그 뒤에 제 목소리로 나간 말 중에는 제가 하지 않은 것도 있어요.'}]}
};
for(const list of Object.values(ACTIONS))for(const a of list)if(a.npc&&INTRO_SCENES[a.npc]){a.text=INTRO_SCENES[a.npc].text;a.dialogue=INTRO_SCENES[a.npc].dialogue;delete a.say;}
ACTIONS.ward.push(A('naraSymptoms','나래에게 손목의 검은 자국을 묻는다',{needHere:'나래',knowledge:'erosionExplained',text:'나래는 천을 쥔 손을 내려다본다.',dialogue:[{who:'나',text:'손목은 왜 그렇게 됐어요?'},{who:'나래',text:'기계를 오래 쓰고 나서 번졌어. 여기선 침식이라고 불러. 상처랑 달라. 약을 써도 그대로였거든.'},{who:'나',text:'줄일 방법은 없어요?'},{who:'나래',text:'꺼두고 쉬면 덜해져. 차폐 필터도 써 봤고. 이상하게 보이는 사람이 있으면 바로 덤비지 마. 내 눈이 틀렸을 때도 있었어.'}]}));
ACTIONS.square.push(A('seojinTrail','서진에게 해원이 학교를 떠난 이유를 묻는다',{needHere:'서진',text:'서진이 종이에 적힌 마지막 수신 시각을 짚는다.',dialogue:[{who:'나',text:'학교에서는 왜 나간 거예요?'},{who:'서진',text:'약을 가져다주고 오겠다고 했어요. 제가 부탁한 일이었어요.'},{who:'나',text:'누구에게 가져다주는 약이었나요?'},{who:'서진',text:'다친 사람이 있다는 연락만 들었어요. 어디에 있는지는 해원이 확인한다고 했고요. 제가 같이 갔어야 했는데.'}]}));
ACTIONS.square.push(A('seojinDevice','서진에게 단말기 사용 뒤의 이상을 묻는다',{needHere:'서진',knowledge:'erosionExplained',text:'서진이 단말기를 꺼내다 말고 다시 주머니에 넣는다.',dialogue:[{who:'나',text:'기계는 계속 켜 두는 게 나을까요?'},{who:'서진',text:'잘 모르겠어요. 오래 듣고 나면 손목에 검은 선이 번져요. 사람 얼굴이 이상하게 보이기도 하고요.'},{who:'서진',text:'마을에서는 침식이라고 부르더라고요. 화면을 끄고 쉬거나 차폐 필터를 쓰면 조금 나아졌어요. 상처를 치료하는 것과는 달랐고요.'}]}));
ACTIONS.school.push(A('doyunWork','도윤에게 어떤 일을 하던 사람인지 묻는다',{needHere:'도윤',text:'도윤이 다친 손을 움직여 보다가 얼굴을 찌푸린다.',dialogue:[{who:'나',text:'원래 여기서 일했어요?'},{who:'도윤',text:'설비 점검을 했어요. 그래서 혼자 고칠 수 있을 줄 알았죠.'},{who:'도윤',text:'그런데 기계가 시키는 순서가 점검판과 달랐어요. 다음에는… 같이 표지부터 봐 주세요.'}]}));
ACTIONS.hall.push(A('suhoTrust','수호에게 단말기를 끄기 두려운 이유를 묻는다',{needHere:'수호',text:'수호의 엄지가 전원 버튼 위에서 멈춘다.',dialogue:[{who:'나',text:'지금은 물이 없잖아요. 잠깐 꺼 보는 건 어때요?'},{who:'수호',text:'알아요. 그런데 끄려고 하면 또 경고가 와요. 이번에는 제가 못 들을까 봐…'},{who:'나',text:'경고가 언제 왔는지 같이 볼까요?'},{who:'수호',text:'그러면 옆에 있어 주세요. 혼자 끄지는 못하겠어요.'}]}));
ACTIONS.forest.push(A('haewonMemory','해원에게 전에 만났던 일을 묻는다',{needHere:'해원',text:'해원이 책상 위에 남겨 둔 메모를 네 쪽으로 돌린다.',dialogue:[{who:'나',text:'내가 여기서 무슨 말을 했어요?'},{who:'해원',text:'사람이 남아 있는지 확인하고 중계실로 돌아간다고 했어요. 저한테는 이곳에서 기다리라고 했고요.'},{who:'나',text:'그 뒤에 다른 연락은 없었어요?'},{who:'해원',text:'같은 목소리가 따라오라고 했어요. 그런데 메모에는 기다리라고 적혀 있어서 안 갔어요.'}]}));
ACTIONS.relay.push(A('operatorReason','윤서에게 왜 안내를 계속하는지 묻는다',{needHere:'윤서',text:'윤서가 헤드폰 한쪽을 들어 올린다. 끊긴 호출음이 새어 나온다.',dialogue:[{who:'나',text:'당신도 나가면 되잖아요. 왜 여기 남았어요?'},{who:'윤서',text:'연락이 끝난 사람이 밖으로 나간 건지, 안에서 쓰러진 건지 모르겠어요.'},{who:'윤서',text:'누군가는 끝까지 받아야 한다고 생각했어요. 그게 옳은 판단이었는지는… 기록을 보고 이야기할게요.'}]}));

// v5.7: observed details precede conclusions; routes remain open.
WORLD.ward.text='얇은 담요 아래에서 눈을 뜬다. 침대 옆에는 젖은 작업화와 작은 단말기가 놓여 있다. 창문 너머로 방파제가 보이고, 유리에는 소금기 섞인 빗물이 흐른다. 머리가 욱신거린다. 이름을 떠올리려 할수록 아무것도 잡히지 않는다. 복도에서 젖은 신발을 끄는 소리가 멈춘다.';
WORLD.forest.text='해송 사이로 낮은 관리소 지붕이 보인다. 끊어진 전선이 길가에 늘어져 있고, 가지 끝에는 노란 종이 조각이 걸려 있다. 문 앞의 진흙에는 작은 장화 자국이 이어진다. 안에서 사람 기침 같은 소리가 난다.';
WORLD.relay.text='기계 열기로 공기가 눅눅하다. 책상 위에는 테이프와 방수 카드함이 있고, 벽 아래로 굵은 전선이 지나간다. 걸쇠에 손을 대자 손가락이 먼저 움직인다. 어디서 배웠는지는 기억나지 않는다. 칸막이 너머에서 헤드폰을 벗는 소리가 난다.';
WORLD.school.text='운동장에는 버스가 떠난 타이어 자국만 남아 있다. 현관의 종이에는 대피자 번호와 문 색깔이 적혀 있다. 복도 끝에는 조끼를 입은 형체가 서 있다. 천장 스피커에서 짧은 잡음이 날 때마다 조끼 아래 손끝이 떨린다.';
const revisionText={
 firstSave:'안내받은 점검문의 걸쇠를 밀자 침대 뒤 통로가 열린다. 몸을 빼내는 순간 방문 손잡이가 끝까지 돌아간다. 문 아래로 길쭉한 그림자가 들어왔다가 멈춘다. 통로 바깥에는 광장과 약국을 가리키는 낡은 화살표가 있다. 이 방에서 기다릴 수는 없다.',
 treatment:'서랍 속 처치표에서 0417을 찾는다. 회관 작업반에서 옮겨 온 환자. 머리 충격과 손의 상처. 이름 칸에는 물음표만 적혀 있다. 누가 나를 데려왔는지 알려면 회관의 기록을 찾아야 한다.',
 group:'마지막 대피조 명부다. 해원이라는 이름 옆에는 완료 표시가 있지만, 다른 줄과 달리 확인 서명이 없다. 여백에는 학교 집결지라고 적혀 있다. 이 표시만으로 밖에 나갔다고 단정할 수는 없다.',
 trail:'노란 봉투에는 관리소로 보낼 약의 목록과 출입 번호가 적혀 있다. 자리표의 해원 이름 옆에는 약 전달로 잠시 나감이라는 메모가 남았다. 학교를 떠난 것과 마을에서 탈출한 것은 다른 일이었다.',
 rules:'현관에는 해안의 외부 대피 통로로 이어지는 비상문이 있다. 한 사람용 녹색 문과 단체용 청색 문은 같은 잠금장치를 나눠 쓴다. 청색 문에는 회관에서 확인한 현재 동행자 번호가 필요하다. 안내문 마지막 줄에는 이름을 방송하지 말고 번호만 입력하라고 적혀 있다.',
 photo:'필름 사진 한 귀퉁이에 0417이 적혀 있다. 작업복 차림의 사람이 나와 닮았다. 옆에는 헤드폰을 쓴 여자와 전원함이 보인다. 뒷면에는 중계실 점검반이라고 적혀 있다. 노란 우비를 입은 사람 아래에는 해원이라는 이름이 있다.',
 tape:'처음에는 잡음뿐이다. 곧 출력을 낮춰요, 다른 장치에서도 제 목소리가 나와요라는 말이 들린다. 녹음 속 목소리가 내 것과 닮았다. 뒤이어 여자가 잠시만 기다려 달라고 답한다. 테이프 뒤쪽에서는 같은 목소리가 정반대의 안내를 한다.'
};
for(const list of Object.values(ACTIONS))for(const a of list)if(revisionText[a.id])a.text=revisionText[a.id];
CLUES.rules.text='학교 비상문은 해안 외부 대피 통로로 이어진다. 녹색은 한 명, 청색은 회관에서 확인한 동행자 전원. 이름 대신 번호를 입력한다.';
CLUES.schoolTrail.text='학교 자리표에는 해원이 약 전달을 위해 잠시 나갔다고 적혀 있다. 노란 봉투의 목적지는 숲 관리소다. 실제 도착 여부는 확인하지 못했다.';

// Choices about people and testimony share the same world as survival.
ACTIONS.hall.push(
 A('suhoQuiet','수호 곁에서 단말기를 잠깐 꺼 보자고 한다',{needHere:'수호',knownNpc:'수호',decisionGroup:'suhoConnection',effect:'suhoQuiet',text:'수호의 엄지가 전원 버튼 위를 맴돈다. 네가 옆자리에 앉자 화면에서 눈을 뗀다.',dialogue:[{who:'나',text:'내가 옆에 있을게요. 잠깐만 꺼 보고 몸이 달라지는지 확인해요.'}]}),
 A('suhoListen','수호가 계속 연락을 받도록 두고 옆에서 지켜본다',{needHere:'수호',knownNpc:'수호',decisionGroup:'suhoConnection',effect:'suhoListen',text:'수호는 단말기를 내려놓지 않는다. 네가 대답을 기다리는 동안 화면에 새 안내가 뜬다.',dialogue:[{who:'나',text:'지금 당장 끄라고 하진 않을게요. 대신 무슨 말을 들었는지 나에게도 알려 줘요.'}]})
);
ACTIONS.square.push(
 A('shareTrail','서진에게 약 봉투에 적힌 목적지를 알려 준다',{needHere:'서진',knownNpc:'서진',needClue:'schoolTrail',decisionGroup:'seojinTruth',effect:'shareTrail',text:'서진에게 학교에서 찾은 봉투와 자리표를 펼쳐 보인다.',dialogue:[{who:'나',text:'학교에서 찾은 약 봉투예요. 목적지는 관리소라고 적혀 있어요. 기록과 직접 본 일을 나눠서 말씀드릴게요.'}]}),
 A('holdTrail','해원을 직접 확인할 때까지 서진에게 목적지를 말하지 않는다',{needHere:'서진',knownNpc:'서진',needClue:'schoolTrail',decisionGroup:'seojinTruth',effect:'holdTrail',text:'봉투를 접어 넣는다. 잘못된 희망을 주고 싶지 않지만, 서진은 네 손을 보고 있다.',dialogue:[{who:'나',text:'아직 확인할 게 있어요. 확실해지면 이야기할게요.'}]})
);
ACTIONS.relay.push(
 A('keepTestimony','윤서의 증언을 원본 녹음과 함께 기록한다',{needHere:'윤서',knownNpc:'윤서',needFlag:'operatorProof',needClue:'original',decisionGroup:'operatorRecord',effect:'keepTestimony',text:'출력을 높인 시각과 중단 요청을 종이에 나란히 적는다. 윤서가 적힌 시간을 한 번씩 확인한다.',dialogue:[{who:'나',text:'사람을 구하려고 했다는 말도, 위험을 알면서 기다렸다는 말도 함께 남길게요.'}]}),
 A('deferTestimony','윤서의 잘못을 기록하는 일은 지금 미룬다',{needHere:'윤서',knownNpc:'윤서',needFlag:'operatorProof',needClue:'original',decisionGroup:'operatorRecord',effect:'deferTestimony',text:'펜을 내려놓는다. 윤서는 변명하려다 말을 멈춘다. 원본 테이프는 그대로 있다.',dialogue:[{who:'나',text:'지금은 남은 사람부터 확인해요. 이 이야기를 없던 일로 하겠다는 뜻은 아니에요.'}]})
);
for(const list of Object.values(ACTIONS))for(const a of list){const costs={suhoQuiet:'동의 여부에 따라 연결 중단 · 관계 변화',suhoListen:'관계 상승 · 수호의 침식 증가',shareTrail:'확인한 기록 공유 · 서진의 신뢰 변화',holdTrail:'정보 보류 · 서진의 신뢰 변화',keepTestimony:'실물 증언 보존 · 윤서와 긴장',deferTestimony:'증언 정리 보류 · 원본은 유지'};if(costs[a.id])a.cost=costs[a.id];}

const ENDING_SCENES={
 sea:{scene:'sea',mood:'dawn',caption:'안개 바깥으로 이어지는 흰 불빛'},seaTogether:{scene:'sea',mood:'dawn',cast:'party',caption:'같은 배에 오른 사람들'},
 schoolSolo:{scene:'school',mood:'quiet',caption:'한 사람을 통과시킨 문'},schoolTogether:{scene:'school',mood:'dawn',cast:'party',caption:'현재 함께 있는 번호로 다시 쓴 명부'},
 drain:{scene:'drain',mood:'quiet',caption:'물이 빠진 통로 끝의 빛'},drainTogether:{scene:'drain',mood:'dawn',cast:'party',caption:'마지막 사다리를 함께 지난 뒤'},
 rail:{scene:'rail',mood:'quiet',caption:'방송 대신 종이에 남아 있던 행선지'},light:{scene:'sea',mood:'signal',object:'mirror',caption:'목소리 없이 전한 빛'},
 forest:{scene:'forest',mood:'dawn',caption:'관리소 뒤로 이어지는 길'},operator:{scene:'relay',mood:'dawn',cast:'operator',caption:'목소리 너머에 있던 사람'},
 dark:{scene:'refuge',mood:'offline',object:'phone',caption:'화면을 끈 뒤에도 남아 있는 세계'},earned:{scene:'evidence',mood:'dawn',caption:'맞지 않던 말들을 끝까지 확인했다'},
 trueSight:{scene:'refuge',mood:'clear',cast:'party',caption:'내 시야와 다른 흔적을 함께 본 사람'},falseSight:{scene:'refuge',mood:'distorted',cast:'party',caption:'안전한 곳에서도 그림자가 겹친다'},
 mimic:{scene:'refuge',mood:'double',cast:'mimic',caption:'같은 얼굴이 다른 기억을 말한다'},changedCompanion:{scene:'refuge',mood:'mutation',cast:'changed',caption:'변화는 경계 밖에서도 멈추지 않았다'},
 changedSelf:{scene:'refuge',mood:'mutation',cast:'self',caption:'살아 나왔지만 몸은 돌아오지 않았다'},haewon:{scene:'forest',mood:'dawn',cast:'sisters',caption:'완료 표시 뒤에 남아 있던 사람'},
 reconcile:{scene:'refuge',mood:'warm',cast:'rejoined',caption:'헤어진 뒤 다시 선택한 동행'},disclosure:{scene:'evidence',mood:'clear',caption:'의도와 피해를 함께 남긴 기록'},
 stay:{scene:'relay',mood:'amber',caption:'다음 연락을 받기 위해 남겨 둔 자리'},name:{scene:'school',mood:'dark',caption:'여러 문 뒤에서 같은 이름이 대답한다'},
 reef:{scene:'sea',mood:'red',caption:'구조 신호가 아니었던 붉은 불빛'},caught:{scene:'school',mood:'dark',monster:'school',caption:'손잡이에 닿기 전에 멎은 발소리'},
 drowned:{scene:'drain',mood:'submerged',caption:'빛보다 먼저 올라온 물'},signal:{scene:'relay',mood:'static',cast:'self',caption:'다음 사람을 맞는 익숙한 목소리'},
 assault:{scene:'refuge',mood:'dark',cast:'attacker',caption:'도움을 청했던 손이 돌아섰다'},exhausted:{scene:'refuge',mood:'fading',caption:'대답할 힘이 남지 않았다'},
 schoolTaken:{scene:'school',mood:'dark',monster:'school',caption:'마지막 종 뒤에서 길어진 팔'},forestTaken:{scene:'forest',mood:'dark',monster:'forest',caption:'발자국 없는 목소리가 남긴 자리'},
 marketTaken:{scene:'market',mood:'dark',monster:'market',caption:'움직이던 천막 안의 빈자리'},waterTaken:{scene:'drain',mood:'submerged',monster:'water',caption:'난간 아래로 사라진 번호'}
};
const ENDING_TEXT_REVISIONS={
 schoolSolo:'한 사람용 녹색 문을 지나 마을의 경계를 벗어났다. 문은 뒤에서 닫혔다. 밖의 공기는 차가웠고, 안쪽의 방송은 더 이상 들리지 않았다.',
 drainTogether:'물길과 전원을 확인한 뒤 마지막 사다리를 함께 올랐다. 먼저 올라간 사람이 뒤따르는 손을 잡았다. 물소리는 발아래에 남았다.',
 trueSight:'사진과 반사에 비친 모습은 내 눈에 보이던 것과 달랐다. 상대를 바꾸려 하기 전에 내 시야를 확인했다. 바깥에서도 혼자 단정하지 않기로 했다.',
 mimic:'재회한 존재의 기억과 흔적은 처음 만난 사람과 맞지 않았다. 그런데도 함께 나왔다. 문 밖에서 같은 질문을 하자, 곁의 존재는 또 다른 대답을 했다.',
 changedCompanion:'변화가 진행된 동료와 함께 마을을 나왔다. 구조 거점에서는 먼저 상태를 확인하고 서로의 공간을 나눴다. 함께 나온 것이 회복을 뜻하지는 않았다.',
 name:'방송에 내 이름을 말하고 열린 문을 따라갔다. 안쪽 스피커들이 같은 이름으로 대답한다. 돌아서자 들어온 문이 보이지 않는다.',
 drowned:'차오르는 물을 보고도 낮은 통로로 더 내려갔다. 돌아섰을 때는 사다리 아래 단이 물에 잠겨 있었다. 손을 뻗어도 다음 단이 잡히지 않았다.',
 assault:'공격이 시작됐는데도 익숙한 얼굴을 믿고 따라갔다. 그 손은 끝내 놓아주지 않았다. 가까이에 있던 목소리도 더는 내 말에 답하지 않는다.',
 forestTaken:'발자국 없는 우비 쪽으로 다가갔다. 익숙한 말을 되풀이하던 목소리가 멎고, 가지처럼 갈라진 팔이 돌아갈 길을 닫았다.',
 marketTaken:'시선을 돌린 틈에 손들이 다가왔다. 가로막힌 천막 틈을 밀어붙였지만 그 뒤에도 빈 길은 없었다. 그림자가 천 아래로 끌려갔다.'
};
for(const e of ENDS)if(ENDING_TEXT_REVISIONS[e.id])e.text=ENDING_TEXT_REVISIONS[e.id];

// v5.11 — establish an audible channel before referring to a voice.
ACTIONS.ward.find(a=>a.id==='firstMail').text='단말기 화면에 음성 수신 표시가 켜진다. 작은 스피커에서 잡음 뒤로 여자의 목소리가 나온다. 화면에는 같은 말이 수신 자막으로 남는다.';

CLUES.operatorIdentity={title:'윤서의 직접 진술과 작업 명찰',kind:'증언과 관찰',text:'중계실에서 만난 여자가 윤서라고 소개했다. 작업 명찰에는 통신 작업반 윤서라고 적혀 있고, 회관 사진 속 헤드폰과 같은 장비를 쓰고 있다. 이후 안내를 모두 본인이 했다는 뜻은 아니다.'};

// v5.12 full narrative audit: effective authored scenes and evidence.
INTRO_SCENES.나래.dialogue=[
 {who:'나',text:'잠깐만요. 누구세요? 왜 화면을 가리는 거예요?'},
 {who:'나래',text:'나래야. 여기서 대피 방송을 했어. 잠깐만 화면을 내려 봐. 복도 소리, 아직 들리지?'},
 {who:'나',text:'들려요. 그런데 방금 저 기계가 점검문을 알려 줘서 나왔어요.'},
 {who:'나래',text:'알아. 나도 도움을 받았어. 그러다 붉은 불빛 쪽으로 가라는 말을 믿고 사람들을 보냈지.'},
 {who:'나',text:'그쪽에 뭐가 있었는데요?'},
 {who:'나래',text:'바위에 부서지는 파도 소리만 돌아왔어. 그 뒤로 연락이 끊겼고. 그래서 지금은 안내를 받으면 현장부터 확인해.'}
];
INTRO_SCENES.도윤.text='밧줄을 선반 오른쪽 기둥에 걸고 매듭을 조인다. 몸을 기대 선반을 들어 올리자 남자가 무릎으로 바닥을 밀어 빠져나온다. 매듭이 있는 짧은 끝을 잘라 건네자 다치지 않은 손으로 받는다.';
INTRO_SCENES.도윤.dialogue=[{who:'나',text:'이제 나와도 돼요. 손은 움직일 수 있어요?'},{who:'도윤',text:'움직이면 아파요. 잠깐 눌러 두면… 괜찮을 줄 알았는데.'},{who:'나',text:'이름이 어떻게 되세요?'},{who:'도윤',text:'도윤이에요. 여기 설비를 점검했어요. 꺼내 주셔서 고맙습니다.'}];
INTRO_SCENES.수호.dialogue=[{who:'나',text:'물 고마워요. 어떻게 불러 드리면 될까요?'},{who:'수호',text:'수호예요. 아까 지하에 물이 찼을 때 이 기계가 사다리 위치를 알려 줬어요.'},{who:'나',text:'그래서 계속 켜 두고 있는 거군요.'},{who:'수호',text:'끄면 다음 경고를 놓칠 것 같아서요. 지금도 새 안내가 오는지 자꾸 보게 돼요.'}];
INTRO_SCENES.해원.dialogue=[{who:'해원',text:'다시 오셨네요. 언니도 같이 왔어요?'},{who:'나',text:'저를 아세요? 미안하지만 여기 왔던 일이 기억나지 않아요. 이름부터 알려 주실래요?'},{who:'해원',text:'해원이에요. 언니는 서진이고요. 저한테 여기서 기다리라고 메모를 남기고 가셨잖아요.'},{who:'나',text:'그 메모를 보여 줄 수 있어요?'},{who:'해원',text:'네. 이 작업 번호도 당신 손목표와 같아요. 그걸 보고 기다렸어요.'}];
PEOPLE.나래.memory='처음 만났을 때 회색 천으로 화면을 가리고 복도 소리를 들어 보라고 했어.';
PEOPLE.수호.memory='금속 컵을 건네고 나서 다시 기계를 두 손으로 잡았어요.';
CLUES.photo.text='회관 작업반 사진에 나와 닮은 사람과 헤드폰을 쓴 여자가 있다. 귀퉁이에 작업 번호 0417, 뒷면에 중계실 점검반이라고 적혀 있다. 노란 우비를 입은 사람 아래에는 해원이라는 이름이 있고, 펼친 손바닥 위에 작은 조개가 보인다.';
CLUES.confession.text='윤서는 처음 점검문을 안내한 사람이 자신이라고 밝혔다. 이후 자신의 목소리로 나온 안내 중에는 직접 하지 않은 말도 있다고 주장한다. 출력 조작 여부는 아직 원본 녹음과 대조해야 한다.';
PEOPLE.해원.device='배터리가 꺼진 단말기를 지니고 있으며, 남겨 둔 메모를 보고 기다렸다';
PEOPLE.서진.secret='해원에게 약을 가져다 달라고 부탁했고, 혼자 보낸 일을 후회한다.';
function narrativeAction(id,patch){for(const list of Object.values(ACTIONS)){const a=list.find(x=>x.id===id);if(a)Object.assign(a,patch);}}
for(const list of Object.values(ACTIONS))for(const a of list)if(a.npc){a.text=INTRO_SCENES[a.npc].text;a.dialogue=INTRO_SCENES[a.npc].dialogue;}
narrativeAction('naraPast',{needHere:'나래',text:'나래가 당시 적어 둔 수신 시각을 보여 준다.',dialogue:[{who:'나',text:'그때 들은 안내를 그대로 적어 둔 거예요?'},{who:'나래',text:'응. 붉은 불빛이 구조선이라는 말이었어. 부두 표를 읽기 전에 방송부터 해 버렸지.'},{who:'나',text:'회관 보고서에 남은 시각과 비교해 볼게요.'}]});
narrativeAction('shell',{needHere:'해원',text:'해원이 약 봉투에서 작은 조개를 꺼내 손바닥에 올린다. 사진에서처럼 손가락 한 마디쯤 되는 크기다.',dialogue:[{who:'나',text:'회관 사진에서도 작은 조개를 들고 있었어요. 지금 가진 게 그 조개예요?'},{who:'해원',text:'네. 언니에게 주려고 챙겼어요. 약 봉투에 넣어 뒀고요.'},{who:'나',text:'조개만으로 판단할 수는 없지만, 사진 속 물건과 이어지네요. 여기 오기 전 일도 들려주세요.'},{who:'해원',text:'학교에서 약을 받아 왔어요. 여기 다친 분에게 붕대를 갈아 주고, 당신이 남긴 메모대로 기다렸어요.'}]});
narrativeAction('operatorProof',{needHere:'윤서',text:'원본 녹음의 시각을 윤서 앞에서 다시 확인한다.',dialogue:[{who:'나',text:'처음에는 손목 번호를 확인하고 점검문으로 나오라고 했죠?'},{who:'윤서',text:'네. 침대 뒤 작은 걸쇠를 밀라고 했어요. 그 안내는 제가 보냈어요.'},{who:'나',text:'그 전에는 출력을 올렸고요. 여기 중단 요청 뒤에도 송신이 이어져요.'},{who:'윤서',text:'구조 신호를 멀리 보내려 했어요. 다른 기기에서 같은 말이 나오는 걸 알고도 바로 끊지 못했어요.'}]});
narrativeAction('rest',{text:'불 꺼진 가게 벽에 등을 기대고 단말기를 내려놓는다. 잠깐 눈을 감았다 뜨자 빗물이 처마를 두드리는 소리가 또렷해진다.'});
narrativeAction('report',{text:'회관 책상의 서랍을 끝까지 당기자 안쪽에 두 번째 잠금판이 보인다. 이전 접속 기록에 남은 번호로 잠금을 풀어 보고서를 꺼낸다. 목소리 학습 장치의 접속 시간과 신체 변화가 나란히 적혀 있다.'});
narrativeAction('forestMemo',{text:'관리소 책상의 메모에는 0417이라는 작업 번호와 약 전달 요청이 있다. 마지막 줄에는 여기서 기다려 달라는 부탁이 적혀 있다. 이 메모만으로 중계실에서 무슨 결정을 했는지까지는 알 수 없다.'});
narrativeAction('railFix',{needItem:'rail',text:'점검차 잠금장치를 열고 브레이크 연결핀을 끼운다. 차를 조금 밀었다가 제동을 걸자 바퀴가 멎는다. 종이 배차표의 정비소 방향과 철로가 이어진 방향을 다시 확인한다.'});
narrativeAction('stay',{text:'유선 수화기를 손 닿는 곳으로 옮기고 빈 의자에 앉는다. 호출이 들어오면 수신 시각과 마지막 위치부터 적기로 한다.'});


// v5.13 — spoken dialogue pass. Keep rules in the notebook, not every character's mouth.
const spokenScene=(n,text,pairs)=>{INTRO_SCENES[n]={text,dialogue:pairs.map(([who,text])=>({who,text}))};};
spokenScene('나래','점검문 밖에서 여자가 네 손목을 잡는다. 회색 천이 화면 위로 덮인다. 여자는 방문 쪽에 귀를 기울인 채 손가락을 입에 댄다.',[
 ['나','뭐 하는 거예요?'],['나래','쉿. 아직 저기 있어.'],['나','누구세요?'],['나래','나래. 여기 사람이야. 너도 저 기계 듣고 나온 거지?'],['나','저 문으로 나가라고 해서요.'],['나래','그래. 이번엔 맞았네.'],['나','이번엔요?'],['나래','…일단 목소리 낮춰. 저 발소리 멀어지면 얘기하자.']]);
spokenScene('서진','정류장 앞 여자가 네 뒤를 살핀다. 누군가 더 오기를 기다리는 듯 한 발 옆으로 비켜선다.',[
 ['서진','혼자 오셨어요? 뒤에 다른 사람은요?'],['나','못 봤어요. 누굴 기다리세요?'],['서진','제 동생요. 노란 우비 입은 여자… 혹시 못 보셨어요?'],['나','미안해요. 이름이 뭐예요?'],['서진','해원이에요. 저는 서진이고요.'],['나','마지막으로 어디서 봤어요?'],['서진','학교 체육관 앞이요. 약 좀 갖다주고 온다더니… 기계에는 나갔다고 떠요. 나갔으면 저한테 연락을 했겠죠.']]);
spokenScene('도윤','밧줄을 선반 오른쪽 기둥에 걸고 매듭을 조인다. 몸을 기대 선반을 들어 올리자 남자가 바닥을 밀며 빠져나온다. 그는 밧줄의 짧은 끝을 붙든 채 숨을 몰아쉰다.',[
 ['나','나왔어요. 이제 손 놓아도 돼요.'],['도윤','잠깐… 숨 좀 돌릴게요.'],['나','손, 피 나는데요.'],['도윤','끼었어요. 제가 빼 보려다가.'],['나','일어설 수 있겠어요?'],['도윤','네. 다리는 괜찮아요. 아, 도윤입니다. 정말… 고맙습니다.']]);
spokenScene('수호','남자가 손잡이 있는 낡은 금속 컵을 내민다. 네가 컵을 받자 빈손을 곧바로 단말기에 얹는다.',[
 ['수호','드세요. 깨끗한 물이에요.'],['나','고마워요. 여기 혼자 계셨어요?'],['수호','네. 수호라고 해요. 밖에 물은 좀 빠졌어요?'],['나','여기 오는 길은 괜찮았어요.'],['수호','아까는 허리까지 찼거든요. 저 기계가 사다리를 안 알려 줬으면…'],['나','그 뒤로 계속 듣고 계신 거예요?'],['수호','또 놓칠까 봐요. 저만 못 듣고 있으면 어떡해요.']]);
spokenScene('해원','노란 우비를 입은 여자가 의자에서 벌떡 일어난다. 너를 보더니 문 밖으로 고개를 내민다.',[
 ['해원','오셨네요! 언니는요?'],['나','잠깐만요. 저를 알아요?'],['해원','…왜 그러세요? 아까 여기 계셨잖아요.'],['나','머리를 다쳤어요. 잘 기억이 안 나요. 이름이 뭐예요?'],['해원','해원이요. 서진 언니 동생. 저보고 여기 있으라고 하셨는데.'],['나','제가요?'],['해원','네. 메모도 써 주셨어요. 여기, 이 번호… 손목에 있는 거랑 같잖아요.']]);
spokenScene('윤서','칸막이 뒤에서 여자가 나온다. 헤드폰 선이 팔꿈치에 걸리자 급히 풀어 낸다. 가슴의 작업 명찰에는 통신 작업반 윤서라고 적혀 있다.',[
 ['나','그 목소리…'],['윤서','살아 계셨네요. 점검문으로 나오신 거죠?'],['나','문 잠그라고 한 사람이 당신이에요?'],['윤서','네. 윤서예요. 통신실에 있어요. 계속 여기 있었고요.'],['나','그럼 다른 안내도 전부 당신이…'],['윤서','아뇨. 그건 아니에요. 제 목소리가 들렸어도… 제가 한 말이 아닌 게 있어요.']]);
for(const list of Object.values(ACTIONS))for(const a of list)if(a.npc){a.text=INTRO_SCENES[a.npc].text;a.dialogue=INTRO_SCENES[a.npc].dialogue;}
const exchange=(id,pairs)=>narrativeAction(id,{dialogue:pairs.map(([who,text])=>({who,text}))});
exchange('naraSymptoms',[
 ['나','손목, 다친 거예요?'],['나래','이거? 상처 아니야. 문질러도 안 지워져.'],['나','언제부터요?'],['나래','기계 붙들고 밤샌 다음부터. 다들 침식이니 뭐니 하던데.'],['나','약은 써 봤어요?'],['나래','소용없었어. 꺼 두고 쉬니까 좀 옅어지긴 해. 필터도 조금은 낫고.']]);
exchange('naraPast',[
 ['나','아까, 이번엔 맞았다고 했죠. 전에는 틀렸어요?'],['나래','붉은 불빛 쪽으로 가라더라. 구조선이라고. 내가 그걸 방송했고.'],['나','사람들이 갔어요?'],['나래','…응. 무전이 끊기기 전에 파도 소리가 들렸어. 배 부서지는 소리도.'],['나','그래서 기계를 가린 거군요.'],['나래','그렇다고 네 것까지 뺏을 순 없지. 나올 문은 제대로 알려 줬으니까.']]);
exchange('seojinTrail',[
 ['나','해원 씨가 어디에 약을 가져간다고 했어요?'],['서진','다친 사람이 있다더라고요. 제가 약을 챙겨 줬어요.'],['나','어디인지는 못 들었고요?'],['서진','네. 금방 온다길래… 우비도 얇은 건데, 이 비에.']]);
exchange('seojinDevice',[
 ['나','그 기계, 계속 켜 두셨어요?'],['서진','해원이 연락할까 봐요.'],['나','손목은 괜찮아요?'],['서진','검게 됐어요. 밤에는 사람 얼굴도 좀 이상하고.'],['나','잠깐 쉬는 게…'],['서진','알아요. 꺼 두면 좀 낫더라고요. 그런데 그 사이에 연락이 오면요?']]);
exchange('doyunWork',[
 ['나','설비는 잘 아시는 것 같던데, 여기서 일해요?'],['도윤','점검하러 다녀요. 저 선반도 받침만 끼우면 될 줄 알았죠.'],['나','혼자 들다가 그렇게 된 거예요?'],['도윤','기계에서 먼저 전원 넣으라길래요. 진동이 오더니 그냥… 앞으로 쏟아졌어요.']]);
exchange('suhoTrust',[
 ['나','계속 무슨 말이 와요?'],['수호','별말 없어요. 그런데 끄려고만 하면 경고가 떠요.'],['나','방금 온 거예요?'],['수호','…모르겠어요. 아까 것도 자꾸 다시 떠서.'],['나','시간부터 봐요. 저 여기 있을게요.'],['수호','그럼 잠깐만요. 어디 가지 마세요.']]);
exchange('haewonMemory',[
 ['나','제가 여기서 뭘 하고 있었어요?'],['해원','전선 보셨어요. 건드리지 말라고 하시고, 사람 더 있나 찾으러 가셨고요.'],['나','중계실로 간다고는 안 했어요?'],['해원','거기로 돌아가야 한다고 했어요. 그런데 나중엔 기계에서 따라오라고…'],['나','그래서 갔어요?'],['해원','아뇨. 메모엔 기다리라고 써 있었잖아요. 그래서 문 잠그고 있었어요.']]);
exchange('operatorReason',[
 ['나','당신은 왜 아직 여기 있어요?'],['윤서','호출이 와요. 한동안 잠잠하다가도 다시 와서.'],['나','다른 사람한테 맡기고 나가면 안 돼요?'],['윤서','맡길 사람이 없어요. 방금 끊긴 게… 나가서 끊긴 건지도 모르겠고.']]);
exchange('shell',[
 ['나','사진에서 그 조개 들고 있던데, 아직 있네요.'],['해원','언니 주려고요. 주머니에 넣으면 깨질까 봐 봉투에 뒀어요.'],['나','학교에서부터 갖고 온 거예요?'],['해원','네. 약도 학교에서 받아 왔어요. 언니가 챙겨 줬어요.'],['나','그 뒤로 여기 있었고요?'],['해원','여기 다친 분 붕대를 갈아 드렸어요. 그러고 기다렸고요.']]);
exchange('operatorProof',[
 ['나','처음에 침대 뒤로 나오라고 했죠. 그건 당신이었고요?'],['윤서','네. 문 밑으로 뭐가 들어온다고 하셔서요.'],['나','이 녹음도 들어 봐요. 제가 끄라고 했는데 왜 계속 켜 뒀어요?'],['윤서','아직 못 나온 사람이 있었어요. 신호가 멀리 가면 찾을 수 있을 줄 알았어요.'],['나','다른 기계에서도 같은 말이 나왔잖아요.'],['윤서','알아요. 그때 멈췄어야 했어요. 조금만 더 기다리면 될 줄 알았어요.']]);
exchange('suhoQuiet',[['나','제가 옆에 있을게요. 잠깐만 꺼 봐요.']]);
exchange('suhoListen',[['나','알겠어요. 대신 무슨 말이 오면 저도 좀 보여 줘요.']]);
exchange('shareTrail',[['나','여기 보세요. 학교 봉투인데, 관리소라고 적혀 있어요.']]);
exchange('holdTrail',[['나','조금만 더 알아보고 올게요. 지금은 저도 잘 몰라요.']]);
exchange('keepTestimony',[['나','지금 한 말, 적어 둘게요. 출력을 올린 이유도 같이요.']]);
exchange('deferTestimony',[['나','일단 사람부터 찾아요. 이 얘기는 나가서 마저 하고요.']]);
PEOPLE.나래.memory='복도에 아직 뭐가 있어서 조용히 하라고 했잖아. 네 화면은 이 천으로 덮었고.';
PEOPLE.수호.memory='물을 건네고 나서도 물이 빠졌냐고 물었죠. 그때는 또 차오를까 봐서요.';
PEOPLE.서진.memory='학교에서 동생을 마지막으로 봤다고 했어요. 노란 우비 입었다고요.';

narrativeAction('naraPast',{cycle:undefined});
