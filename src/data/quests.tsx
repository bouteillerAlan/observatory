// the display is generated automatically thanks to the table. They must be built according to the desired view, for example:
// 'index' : [
//          [ <- rows
//              [1] <- columns
//          ],
//          [
//              [5, 6] <- columns
//              [2, [3,4]] <- columns with 2 rows choices
//          ]
// ]
// give :
//     [1]
//  [5]   [2]
//  [6]  [3][4]

const questsList: any = {
  // all quests id before 2 choices in the game
  '2choice': [113, 106, 119, 125, 135, 130, 140, 18, 29, 23, 35, 45, 40, 49, 61, 72, 67, 85, 79, 90, 93, 158, 164, 165, 174, 185, 175, 188, 208, 215, 204, 232, 221, 226, 236, 256, 255, 250, 263, 267, 274, 278, 286, 291, 296, 304, 309, 313, 321, 320, 322],
  // all quests id before 3 choices in the game
  '3choice': [117, 114, 110, 122, 147, 148, 15, 53, 52, 77, 68, 76, 69, 70, 100, 101, 154, 156, 171, 172, 195, 192, 201, 219, 217, 216, 209, 235, 241, 358, 301, 318],
  // all quests id before 5 choices in the game
  '5choice': [257, 260, 262, 252],

  // all quests for durmand
  'durmand': [251, 256, 254, 261, 257, 285, 286, 287, 288, 289],
  // all quests for whisper
  'whisper': [253, 255, 258, 259, 260, 290, 291, 292, 293, 294],
  // all quests for vigil
  'vigil': [248, 249, 250, 262, 252, 295, 296, 298, 297, 299],

  // ///////// MY STORY ///////////
  // Mon histoire - charr
  '1': [
    [
      [{pid: 0, id: 77}],
    ],
    [
      [{pid: 77, id: 60}, {pid: 60, id: 61}, [{pid: 61, id: 65}, {pid: 61, id: 63}], {pid: [65, 63], id: 66}, {pid: 66, id: 68}],
      [{pid: 77, id: 71}, {pid: 71, id: 72}, [{pid: 72, id: 74}, {pid: 72, id: 73}], {pid: [74, 73], id: 75}, {pid: 75, id: 76}],
      [{pid: 77, id: 59}, {pid: 59, id: 62}, {pid: 62, id: 64}, {pid: 64, id: 67}, [{pid: 67, id: 69}, {pid: 67, id: 70}]],
    ],
    [
      [{pid: [68, 76, 70], id: 83}, {pid: 83, id: 84}, {pid: 84, id: 85}, [{pid: 0, id: 87}, {pid: 87, id: 86}]],
      [{pid: [68, 76, 70], id: 78}, {pid: 78, id: 79}, [{pid: 79, id: 80}, {pid: 79, id: 81}], {pid: [81, 80], id: 82}],
      [{pid: [68, 76, 70], id: 88}, {pid: 88, id: 89}, {pid: 89, id: 90}, [{pid: 90, id: 91}, {pid: 90, id: 92}]],
    ],
    [
      [{pid: [86, 82, 91, 92], id: 93}],
    ],
    [
      [{pid: 93, id: 94}, {pid: 94, id: 97}, {pid: 97, id: 100}],
      [{pid: 93, id: 95}, {pid: 95, id: 98}, {pid: 98, id: 101}],
    ],
    [
      [{pid: [100, 101], id: 104}],
      [{pid: [100, 101], id: 105}],
      [{pid: [100, 101], id: 102}],
    ],
  ],
  // Mon histoire - norn
  '2': [
    [
      [{pid: 0, id: 154}],
    ],
    [
      [{pid: 154, id: 155}, {pid: 155, id: 157}, {pid: 157, id: 158}, [{pid: 158, id: 160}, {pid: 158, id: 161}], {pid: [160, 161], id: 156}],
      [{pid: 154, id: 162}, {pid: 162, id: 164}, [{pid: 164, id: 169}, {pid: 164, id: 168}], {pid: [168, 169], id: 170}, {pid: 170, id: 171}],
      [{pid: 154, id: 159}, {pid: 159, id: 163}, {pid: 163, id: 165}, [{pid: 165, id: 166}, {pid: 165, id: 167}], {pid: [166, 167], id: 172}],
    ],
    [
      [{pid: [156, 171, 172], id: 173}, {pid: 173, id: 174}, [{pid: 174, id: 176}, {pid: 174, id: 182}], {pid: [176, 182], id: 181}],
      [{pid: [156, 171, 172], id: 184}, {pid: 184, id: 183}, {pid: 183, id: 185}, [{pid: 185, id: 187}, {pid: 185, id: 186}]],
      [{pid: [156, 171, 172], id: 175}, [{pid: 175, id: 177}, {pid: 175, id: 178}], {pid: [177, 178], id: 179}, {pid: 179, id: 180}],
    ],
    [
      [{pid: [181, 187, 186, 180], id: 188}],
    ],
    [
      [{pid: 188, id: 197}, {pid: 197, id: 191}, {pid: 191, id: 195}],
      [{pid: 188, id: 189}, {pid: 189, id: 194}, {pid: 194, id: 192}],
    ],
    [
      [{pid: [195, 192], id: 200}],
      [{pid: [195, 192], id: 199}],
      [{pid: [195, 192], id: 198}],
    ],
  ],
  // Mon histoire - human
  '3': [
    [
      [{pid: 0, id: 117}],
    ],
    [
      [{pid: 117, id: 124}, {pid: 124, id: 116}, {pid: 116, id: 113}, [{pid: 113, id: 111}, {pid: 113, id: 112}], {pid: [111, 112], id: 114}],
      [{pid: 117, id: 123}, {pid: 123, id: 109}, {pid: 109, id: 106}, [{pid: 106, id: 108}, {pid: 106, id: 107}], {pid: [108, 107], id: 110}],
      [{pid: 117, id: 115}, {pid: 115, id: 118}, {pid: 118, id: 119}, [{pid: 119, id: 120}, {pid: 119, id: 121}], {pid: [120, 121], id: 122}],
    ],
    [
      [{pid: [114, 110, 122], id: 125}, [{pid: 125, id: 126}, {pid: 125, id: 127}], {pid: [126, 127], id: 128}, {pid: 128, id: 139}],
      [{pid: [114, 110, 122], id: 134}, {pid: 134, id: 135}, [{pid: 135, id: 137}, {pid: 135, id: 136}], {pid: [137, 136], id: 138}],
      [{pid: [114, 110, 122], id: 129}, {pid: 129, id: 130}, [{pid: 130, id: 132}, {pid: 130, id: 131}], {pid: [132, 131], id: 133}],
    ],
    [
      [{pid: [139, 138, 133], id: 140}],
    ],
    [
      [{pid: 140, id: 141}, {pid: 141, id: 145}, {pid: 145, id: 147}],
      [{pid: 140, id: 142}, {pid: 142, id: 144}, {pid: 144, id: 148}],
    ],
    [
      [{pid: [147, 148], id: 151}],
      [{pid: [147, 148], id: 152}],
      [{pid: [147, 148], id: 150}],
    ],
  ],
  // Mon histoire - sylvarie
  '7': [
    [
      [{pid: 0, id: 201}],
    ],
    [
      [{pid: 201, id: 203}, {pid: 203, id: 205}, {pid: 205, id: 208}, [{pid: 208, id: 218}, {pid: 208, id: 211}], {pid: [211, 218], id: 219}],
      [{pid: 201, id: 212}, {pid: 212, id: 213}, {pid: 213, id: 214}, {pid: 214, id: 215}, [{pid: 215, id: 217}, {pid: 215, id: 216}]],
      [{pid: 201, id: 202}, {pid: 202, id: 206}, {pid: 206, id: 204}, [{pid: 204, id: 210}, {pid: 204, id: 207}], {pid: [210, 207], id: 209}],
    ],
    [
      [{pid: [2019, 217, 216, 209], id: 230}, {pid: 230, id: 231}, {pid: 231, id: 232}, [{pid: 232, id: 233}, {pid: 232, id: 234}]],
      [{pid: [2019, 217, 216, 209], id: 220}, {pid: 220, id: 221}, [{pid: 221, id: 222}, {pid: 221, id: 223}], {pid: [222, 223], id: 224}],
      [{pid: [2019, 217, 216, 209], id: 225}, {pid: 225, id: 226}, [{pid: 226, id: 228}, {pid: 226, id: 227}], {pid: [228, 227], id: 229}],
    ],
    [
      [{pid: [233, 234, 224, 229], id: 236}],
    ],
    [
      [{pid: 236, id: 239}, {pid: 239, id: 238}, {pid: 238, id: 235}],
      [{pid: 236, id: 237}, {pid: 237, id: 244}, {pid: 244, id: 241}],
    ],
    [
      [{pid: [235, 241], id: 247}],
      [{pid: [235, 241], id: 243}],
      [{pid: [235, 241], id: 246}],
    ],
  ],
  // Mon histoire - asura
  '8': [
    [
      [{pid: 0, id: 15}],
    ],
    [
      [{pid: 15, id: 17}, {pid: 17, id: 16}, {pid: 16, id: 22}, {pid: 22, id: 18}, [{pid: 18, id: 19}, {pid: 18, id: 20}]],
      [{pid: 15, id: 25}, {pid: 25, id: 28}, {pid: 28, id: 29}, [{pid: 29, id: 30}, {pid: 29, id: 31}], {pid: [30, 31], id: 33}],
      [{pid: 15, id: 21}, {pid: 21, id: 24}, {pid: 24, id: 23}, [{pid: 23, id: 26}, {pid: 23, id: 32}], {pid: [26, 32], id: 27}],
    ],
    [
      [{pid: [19, 20, 33, 27], id: 34}, {pid: 34, id: 35}, [{pid: 35, id: 37}, {pid: 35, id: 36}], {pid: [37, 36], id: 38}],
      [{pid: [19, 20, 33, 27], id: 44}, {pid: 44, id: 45}, [{pid: 45, id: 48}, {pid: 45, id: 46}], {pid: [48, 46], id: 47}],
      [{pid: [19, 20, 33, 27], id: 39}, {pid: 39, id: 40}, [{pid: 40, id: 43}, {pid: 40, id: 41}], {pid: [43, 41], id: 42}],
    ],
    [
      [{pid: [38, 47, 42], id: 49}],
    ],
    [
      [{pid: 49, id: 50}, {pid: 50, id: 56}, {pid: 56, id: 53}],
      [{pid: 49, id: 51}, {pid: 51, id: 57}, {pid: 57, id: 52}],
    ],
    [
      [{pid: [53, 52], id: 54}],
      [{pid: [53, 52], id: 55}],
      [{pid: [53, 52], id: 58}],
    ],
  ],
  // Les Ordres de la Tyrie
  '9': [
    [
      [{pid: [54, 55, 58, 104, 105, 102, 200, 199, 198, 151, 152, 150, 247, 243, 246], id: 358}],
    ],
    // orders choice
    [
      [{pid: 358, id: 251}, {pid: 251, id: 256}, [{pid: 256, id: 254}, {pid: 256, id: 261}], {pid: [254, 261], id: 257}],
      [{pid: 358, id: 253}, {pid: 253, id: 255}, [{pid: 255, id: 258}, {pid: 255, id: 259}], {pid: [258, 259], id: 260}],
      [{pid: 358, id: 248}, {pid: 248, id: 249}, {pid: 249, id: 250}, [{pid: 250, id: 262}, {pid: 250, id: 252}]],
    ],
    // races explo choice
    [
      [{pid: [257, 260, [262, 252]], id: 263}, [{pid: 263, id: 266}, {pid: 263, id: 264}], {pid: [266, 264], id: 265}],
      [{pid: [257, 260, [262, 252]], id: 267}, [{pid: 267, id: 270}, {pid: 267, id: 268}], {pid: [270, 268], id: 269}],
      [{pid: [257, 260, [262, 252]], id: 271}, {pid: 271, id: 272}, {pid: 272, id: 273}],
      [{pid: [257, 260, [262, 252]], id: 274}, [{pid: 274, id: 275}, {pid: 274, id: 276}], {pid: [275, 276], id: 277}],
      [{pid: [257, 260, [262, 252]], id: 278}, [{pid: 278, id: 279}, {pid: 278, id: 280}], {pid: [279, 280], id: 281}],
    ],
    // order quests
    [
      [{pid: [265, 269, 273, 277, 281], id: 285}], // d
      [{pid: [265, 269, 273, 277, 281], id: 290}], // w
      [{pid: [265, 269, 273, 277, 281], id: 295}], // v
    ],
    [
      [{pid: [285, 290, 295], id: 282}],
    ],
    [
      [{pid: 282, id: 286}, [{pid: 286, id: 287}, {pid: 286, id: 288}]], // d
      [{pid: 282, id: 291}, [{pid: 291, id: 292}, {pid: 291, id: 293}]], // w
      [{pid: 282, id: 296}, [{pid: 296, id: 298}, {pid: 296, id: 297}]], // v
    ],
    [
      [{pid: [287, 288, 292, 293, 298, 297], id: 283}],
    ],
    [
      [{pid: 283, id: 289}], // d
      [{pid: 283, id: 294}], // w
      [{pid: 283, id: 299}], // v
    ],
    [
      [{pid: [289, 294, 299], id: 284}],
    ],
  ],
  // Le dragon ancestral Zhaïtan
  '10': [
    [
      [{pid: 284, id: 301}],
    ],
    [
      [{pid: 301, id: 304}, [{pid: 304, id: 302}, {pid: 304, id: 303}], {pid: [302, 303], id: 305}], // dishonored by allies
      [{pid: 301, id: 309}, [{pid: 309, id: 307}, {pid: 309, id: 308}], {pid: [307, 308], id: 310}], // letting an innocent die
      [{pid: 301, id: 312}, {pid: 312, id: 313}, [{pid: 313, id: 315}, {pid: 313, id: 314}]], // making another suffer
    ],
    [
      [{pid: [305, 310, 315, 314], id: 300}],
    ],
    [
      [{pid: 300, id: 306}], // dishonored by allies
      [{pid: 300, id: 311}], // letting an innocent die
      [{pid: 300, id: 316}], // making another suffer
    ],
    [
      [{pid: [306, 311, 316], id: 321}, [{pid: 321, id: 334}, {pid: 321, id: 335}], {pid: [334, 335], id: 320}],
    ],
    [
      [{pid: 320, id: 337}, {pid: 337, id: 339}],
      [{pid: 320, id: 336}, {pid: 336, id: 338}],
    ],
    [
      [{pid: [339, 338], id: 318}],
    ],
    [
      [{pid: 318, id: 325}, {pid: 325, id: 326}, {pid: 326, id: 327}], // d
      [{pid: 318, id: 331}, {pid: 331, id: 332}, {pid: 332, id: 333}], // w
      [{pid: 318, id: 328}, {pid: 328, id: 329}, {pid: 329, id: 330}], // v
    ],
    [
      [{pid: [327, 333, 330], id: 322}, [{pid: 322, id: 317}, {pid: 322, id: 319}], {pid: [317, 319], id: 323}, {pid: 323, id: 324}],
    ],
  ],

  // ///////// GEURRE CONTRE SCARLET ///////////
  // Leçon d histoire de la saison 1
  '39': [
    [
      [{pid: 324, id: 415}],
    ],
  ],

  // ///////// SAISON 2 ///////////
  // 1. À l orée de Maguuma
  '11': [
    [
      [{pid: 415, id: 363}, {pid: 363, id: 362}, {pid: 362, id: 360}, {pid: 360, id: 359}, {pid: 359, id: 361}],
    ],
  ],
  // 2. Emprise maléfique
  '12': [
    [
      [{pid: 361, id: 364}, {pid: 364, id: 365}, {pid: 365, id: 366}, {pid: 366, id: 368}, {pid: 368, id: 367}],
    ],
  ],
  // 3. L'ombre du dragon : 1re partie
  '13': [
    [
      [{pid: 367, id: 371}, {pid: 371, id: 372}, {pid: 372, id: 369}, {pid: 369, id: 374}, {pid: 374, id: 373}],
    ],
  ],
  // 4. L'ombre du dragon : 2e partie
  '14': [
    [
      [{pid: 373, id: 378}, {pid: 378, id: 377}, {pid: 377, id: 379}, {pid: 379, id: 375}],
    ],
  ],
  // 5. Le spectre du temps
  '15': [
    [
      [{pid: 375, id: 384}, {pid: 384, id: 381}, {pid: 381, id: 383}, {pid: 383, id: 380}],
    ],
  ],
  // 6. La voie des ronces
  '16': [
    [
      [{pid: 380, id: 386}, {pid: 386, id: 387}, {pid: 387, id: 385}],
    ],
  ],
  // 7. Les graines de la vérité
  '17': [
    [
      [{pid: 385, id: 388}, {pid: 388, id: 389}, {pid: 389, id: 390}],
    ],
  ],
  // 8. Le point de non-retour
  '18': [
    [
      [{pid: 390, id: 391}, {pid: 391, id: 392}, {pid: 392, id: 393}],
    ],
  ],

  // ///////// HOT ///////////
  // 1. Prologue : ralliement à Maguuma
  '19': [
    [
      [{pid: 393, id: 411}],
    ],
  ],
  // 2. Arrachés au ciel
  '32': [
    [
      [{pid: 411, id: 409}],
    ],
  ],
  // 3. Établir une base avancée
  '41': [
    [
      [{pid: 409, id: 419}],
    ],
  ],
  // 4. Dans la jungle
  '34': [
    [
      [{pid: 419, id: 405}],
    ],
  ],
  // 5. Sur leurs traces
  '26': [
    [
      [{pid: 405, id: 421}],
    ],
  ],
  // 6. Prisonniers du dragon
  '33': [
    [
      [{pid: 421, id: 410}],
    ],
  ],
  // 7. Précieux effets
  '21': [
    [
      [{pid: 410, id: 407}],
    ],
  ],
  // 8. Cité de l'espoir
  '20': [
    [
      [{pid: 407, id: 402}],
    ],
  ],
  // 9. Le chemin du prédateur
  '35': [
    [
      [{pid: 402, id: 423}],
    ],
  ],
  // 10. Curieuses observations
  '31': [
    [
      [{pid: 423, id: 413}],
    ],
  ],
  // 11. Racines de la terreur
  '36': [
    [
      [{pid: 413, id: 408}],
    ],
  ],
  // 12. En avant
  '23': [
    [
      [{pid: 408, id: 417}],
    ],
  ],
  // 13. Connaissances cachées
  '22': [
    [
      [{pid: 417, id: 401}],
    ],
  ],
  // 14. Découpe de signe
  '42': [
    [
      [{pid: 401, id: 418}],
    ],
  ],
  // 15. Récolte amère
  '27': [
    [
      [{pid: 418, id: 398}],
    ],
  ],
  // 16. Corps et âmes
  '25': [
    [
      [{pid: 398, id: 404}],
    ],
  ],

  // ///////// SAISON 3 ///////////
  // 1. Hors des ombres
  '46': [
    [
      [{pid: 404, id: 431}, {pid: 431, id: 435}, {pid: 435, id: 432}, {pid: 432, id: 426}, {pid: 426, id: 429}, {pid: 429, id: 425}],
    ],
  ],
  // 2. L'Embrasement
  '56': [
    [
      [{pid: 425, id: 441}, {pid: 441, id: 443}, {pid: 443, id: 440}, {pid: 440, id: 436}, {pid: 436, id: 442}, {pid: 442, id: 437}, {pid: 437, id: 444}],
    ],
  ],
  // 3. Une fissure dans la glace
  '63': [
    [
      [{pid: 444, id: 453}, {pid: 453, id: 447}, {pid: 447, id: 452}, {pid: 452, id: 448}, {pid: 448, id: 449}, {pid: 449, id: 451}, {pid: 451, id: 446}],
    ],
  ],
  // 4. La Tête du serpent
  '64': [
    [
      [{pid: 446, id: 456}, {pid: 456, id: 458}, {pid: 458, id: 457}, {pid: 457, id: 459}, {pid: 459, id: 455}, {pid: 455, id: 454}],
    ],
  ],
  // 5. Point d'ignition
  '65': [
    [
      [{pid: 454, id: 466}, {pid: 466, id: 461}, {pid: 461, id: 460}, {pid: 460, id: 462}, {pid: 462, id: 464}],
    ],
  ],
  // 6. À la fin du chemin
  '66': [
    [
      [{pid: 464, id: 469}, {pid: 469, id: 473}, {pid: 473, id: 475}, {pid: 475, id: 472}, {pid: 472, id: 468}],
    ],
  ],

  // ///////// POF ///////////
  // 1. Allumer la flamme
  '83': [
    [
      [{pid: 468, id: 488}, {pid: 488, id: 503}],
    ],
  ],
  // 2. Ouvrir la voie
  '67': [
    [
      [{pid: 503, id: 480}],
    ],
  ],
  // 3. Nuit des incendies
  '82': [
    [
      [{pid: 480, id: 486}],
    ],
  ],
  // 4. Le sacrifice
  '72': [
    [
      [{pid: 486, id: 482}, {pid: 482, id: 491}],
    ],
  ],
  // 5. Souvenirs cristallins
  '79': [
    [
      [{pid: 491, id: 484}],
    ],
  ],
  // 6. Sol consacré
  '69': [
    [
      [{pid: 484, id: 500}],
    ],
  ],
  // 7. Affronter la vérité
  '80': [
    [
      [{pid: 500, id: 493}],
    ],
  ],
  // 8. La marche à suivre
  '68': [
    [
      [{pid: 493, id: 477}],
    ],
  ],
  // 9. En partance
  '71': [
    [
      [{pid: 477, id: 496}],
    ],
  ],
  // 10. L'ennemi de mon ennemi
  '75': [
    [
      [{pid: 496, id: 479}, {pid: 479, id: 501}],
    ],
  ],
  // 11. Bête de guerre
  '76': [
    [
      [{pid: 501, id: 483}],
    ],
  ],
  // 12. Tuer un dieu
  '81': [
    [
      [{pid: 483, id: 481}],
    ],
  ],
  // 13. Petite victoire (Épilogue)
  '78': [
    [
      [{pid: 481, id: 499}],
    ],
  ],

  // ///////// SAISON 4 ///////////
  // 1. Aube
  '85': [
    [
      [{pid: 499, id: 505}, {pid: 505, id: 506}, {pid: 506, id: 509}, {pid: 509, id: 511}, {pid: 511, id: 504}, {pid: 504, id: 508}],
    ],
  ],
  // 2. Un bug dans le système
  '86': [
    [
      [{pid: 508, id: 526}, {pid: 526, id: 525}, {pid: 525, id: 521}, {pid: 521, id: 519}, {pid: 519, id: 513}],
    ],
  ],
  // 3. Longue vie à la liche
  '87': [
    [
      [{pid: 513, id: 529}, {pid: 529, id: 527}, {pid: 527, id: 533}, {pid: 533, id: 535}, {pid: 535, id: 532}],
    ],
  ],
  // 4. Guidés par une étoile
  '88': [
    [
      [{pid: 532, id: 537}, {pid: 537, id: 536}, {pid: 536, id: 538}, {pid: 538, id: 540}, {pid: 540, id: 539}],
    ],
  ],
  // 5. Quitte ou double
  '89': [
    [
      [{pid: 539, id: 543}, {pid: 543, id: 544}, {pid: 544, id: 545}, {pid: 545, id: 546}, {pid: 546, id: 542}],
    ],
  ],
  // 6. Guerre éternelle
  '90': [
    [
      [{pid: 542, id: 549}, {pid: 549, id: 552}, {pid: 552, id: 548}, {pid: 548, id: 551}, {pid: 551, id: 547}],
    ],
  ],

  // ///////// Icebrood saga ///////////
  // 1. prologue bound by blood
  '91': [
    [
      [{pid: 547, id: 553}, {pid: 553, id: 554}, {pid: 554, id: 557}, {pid: 557, id: 556}, {pid: 556, id: 555}],
    ],
  ],
};

export default questsList;
