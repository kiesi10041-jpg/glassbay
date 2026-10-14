# 이미지·음향 제작 기록

내장 이미지 생성 기능으로 v5용 이미지 16개를 생성했습니다. 기존 유리만 이미지와 직접 작성한 SVG 물품 아이콘, 이 프로젝트용 합성 배경음악을 재사용합니다. CLI/API 이미지 생성은 사용하지 않았습니다.

새 파일은 assets/ 안에 들어 있습니다. 원본은 보존하고 게임용 파일의 해상도·압축만 최적화했습니다.

## v5 새 장면·인물

- hall.jpg: Wide interior of small Korean coastal village community hall used as emergency operations room, plastic chairs, evacuation cots, work logs on wall, rain wet entry, desk lamp, no readable text.

- clinic.jpg: Wide abandoned small Korean seaside pharmacy treatment room, medicine packets, used gauze without gore, examination cot, wet footprints, frosted glass with faint silhouette, no text.

- haewon.png: Transparent single waist-up portrait Korean young adult woman age20, short bob hair, faded yellow raincoat, tired alert, folded prescription envelope in hand, normal human, one pose.

- operator.png: Transparent single waist-up portrait Korean woman age38, tied dark hair, charcoal utility vest grey shirt, worn headphones around neck, wrist bandage, green handheld radio, tired kind expression, one pose.

- school-threat.jpg: Wide empty Korean school corridor night, far end tall asymmetric human-like figure in damp evacuation vest, face obscured by strips of reflective foil, elongated hand near speaker, wet floor reflection mismatches, no gore.

- forest-threat.jpg: Wide foggy Korean coastal pine forest, slender creature twisted bark-like limbs with traces of human raincoat crouching behind tree, extends hand inviting, faint yellow eyes, partial visibility, no gore.

- pier-threat.jpg: Wide Korean fishing pier night, low crawling inhuman shape of wet fishing nets and long jointed arms climbs from water, small pale reflective faces in net, distant white beacon, no gore.

- market-threat.jpg: Wide abandoned Korean covered market night, tall mannequin entity among suspended raincoats, overlapping fingers, tilted head, shadow reaches nearer than feet, flickering light, no gore.

## 인물별 상태 이미지

- suho-aberrant.png, skeptic-aberrant.png, haewon-aberrant.png, operator-aberrant.png
- suho-injured.png, skeptic-injured.png, haewon-injured.png, operator-injured.png

참조: 해당 인물의 정상 이미지. 프롬프트: identity-preserve: same exact adult, hair and clothing; one transparent waist-up cutout. Distorted variant: twisted pose, uneven shoulders, extended arm, black signal veins, amber eyes, no gore. Injury variant: dry forearm bandage, subtle cheek bruise and forehead gauze, tired expression; normal human eyes, no mutation. No collage or inset.

## 기존 이미지

서진·도윤·주인공의 정상/부상/변이 이미지, 상세 지도, 지역 배경은 앞선 버전에서 생성한 자산입니다.

## 음향

assets/audio/glass-bay-isolation.mp3는 이 프로젝트용으로 합성한 배경음악입니다. 발소리·충격·획득음은 Web Audio로 합성합니다. 외부 음원 링크나 API를 사용하지 않습니다.
