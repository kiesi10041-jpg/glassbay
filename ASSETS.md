# 이미지 생성 기록
환경 12개와 인물 3개는 내장 이미지 생성 도구로 제작한 게임용 이미지입니다.
기존: ward, board, pier, relay, town.
신규 환경: station(폐역), reservoir(저류조), lighthouse(등대), archive(보관소), market(시장), forest(해송 숲), substation(변전소).
신규 인물: player(통신 기사 전신), seojin(서진), doyun(도윤).
공통 환경 프롬프트: 한국 해안 마을의 심리 공포 게임, cinematic painted realism, charcoal blue grey / muted jade / amber, realistic materials, eye level, no people, no readable text, no logos, no UI.
인물은 같은 화풍의 투명 배경 자산으로 생성했습니다. 부상 위치와 지도 연결은 정확한 표시를 위해 코드로 그립니다.

## v3.2 추가
내장 이미지 편집 도구로 player/seojin/doyun의 injured/changed 투명 배경 변형 6개를 제작했습니다. 원본 정체·의상·구도를 유지하고 붕대·멍·피로 또는 비현실적 신호 무늬를 추가했습니다.
assets/items의 23개 SVG 아이콘은 물품을 정확히 구분하도록 직접 그렸습니다.
assets/audio/glass-bay-isolation.mp3는 NumPy 파형 합성으로 만든 64초 원본 배경음악입니다.
