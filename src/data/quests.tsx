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
      [{pid: 0, id: 83}, {pid: 0, id: 84}, {pid: 0, id: 85}, [{pid: 0, id: 87}, {pid: 0, id: 86}]],
      [{pid: 0, id: 78}, {pid: 0, id: 79}, [{pid: 0, id: 80}, {pid: 0, id: 81}], {pid: 0, id: 82}],
      [{pid: 0, id: 88}, {pid: 0, id: 89}, {pid: 0, id: 90}, [{pid: 0, id: 91}, {pid: 0, id: 92}]],
    ],
    [
      [{pid: 0, id: 93}],
    ],
    [
      [{pid: 0, id: 94}, {pid: 0, id: 97}, {pid: 0, id: 100}],
      [{pid: 0, id: 95}, {pid: 0, id: 98}, {pid: 0, id: 101}],
    ],
    [
      [{pid: 0, id: 104}],
      [{pid: 0, id: 105}],
      [{pid: 0, id: 102}],
    ],
  ],
  // Mon histoire - norn
  '2': [
    [
      [{pid: 0, id: 154}],
    ],
    [
      [{pid: 0, id: 155}, {pid: 0, id: 157}, {pid: 0, id: 158}, [{pid: 0, id: 160}, {pid: 0, id: 161}], {pid: 0, id: 156}],
      [{pid: 0, id: 162}, {pid: 0, id: 164}, [{pid: 0, id: 169}, {pid: 0, id: 168}], {pid: 0, id: 170}, {pid: 0, id: 171}],
      [{pid: 0, id: 159}, {pid: 0, id: 163}, {pid: 0, id: 165}, [{pid: 0, id: 166}, {pid: 0, id: 167}], {pid: 0, id: 172}],
    ],
    [
      [{pid: 0, id: 173}, {pid: 0, id: 174}, [{pid: 0, id: 176}, {pid: 0, id: 182}], {pid: 0, id: 181}],
      [{pid: 0, id: 184}, {pid: 0, id: 183}, {pid: 0, id: 185}, [{pid: 0, id: 187}, {pid: 0, id: 186}]],
      [{pid: 0, id: 175}, [{pid: 0, id: 177}, {pid: 0, id: 178}], {pid: 0, id: 179}, {pid: 0, id: 180}],
    ],
    [
      [{pid: 0, id: 188}],
    ],
    [
      [{pid: 0, id: 197}, {pid: 0, id: 191}, {pid: 0, id: 195}],
      [{pid: 0, id: 189}, {pid: 0, id: 194}, {pid: 0, id: 192}],
    ],
    [
      [{pid: 0, id: 200}],
      [{pid: 0, id: 199}],
      [{pid: 0, id: 198}],
    ],
  ],
  // Mon histoire - human
  '3': [
    [
      [{pid: 0, id: 117}],
    ],
    [
      [{pid: 0, id: 124}, {pid: 0, id: 116}, {pid: 0, id: 113}, [{pid: 0, id: 111}, {pid: 0, id: 112}], {pid: 0, id: 114}],
      [{pid: 0, id: 123}, {pid: 0, id: 109}, {pid: 0, id: 106}, [{pid: 0, id: 108}, {pid: 0, id: 107}], {pid: 0, id: 110}],
      [{pid: 0, id: 115}, {pid: 0, id: 118}, {pid: 0, id: 119}, [{pid: 0, id: 120}, {pid: 0, id: 121}], {pid: 0, id: 122}],
    ],
    [
      [{pid: 0, id: 125}, [{pid: 0, id: 126}, {pid: 0, id: 127}], {pid: 0, id: 128}, {pid: 0, id: 139}],
      [{pid: 0, id: 134}, {pid: 0, id: 135}, [{pid: 0, id: 137}, {pid: 0, id: 136}], {pid: 0, id: 138}],
      [{pid: 0, id: 129}, {pid: 0, id: 130}, [{pid: 0, id: 132}, {pid: 0, id: 131}], {pid: 0, id: 133}],
    ],
    [
      [{pid: 0, id: 140}],
    ],
    [
      [{pid: 0, id: 141}, {pid: 0, id: 145}, {pid: 0, id: 147}],
      [{pid: 0, id: 142}, {pid: 0, id: 144}, {pid: 0, id: 148}],
    ],
    [
      [{pid: 0, id: 151}],
      [{pid: 0, id: 152}],
      [{pid: 0, id: 150}],
    ],
  ],
  // Mon histoire - sylvarie
  '7': [
    [
      [{pid: 0, id: 201}],
    ],
    [
      [{pid: 0, id: 203}, {pid: 0, id: 205}, {pid: 0, id: 208}, [{pid: 0, id: 218}, {pid: 0, id: 211}], {pid: 0, id: 219}],
      [{pid: 0, id: 212}, {pid: 0, id: 213}, {pid: 0, id: 214}, {pid: 0, id: 215}, [{pid: 0, id: 217}, {pid: 0, id: 216}]],
      [{pid: 0, id: 202}, {pid: 0, id: 206}, {pid: 0, id: 204}, [{pid: 0, id: 210}, {pid: 0, id: 207}], {pid: 0, id: 209}],
    ],
    [
      [{pid: 0, id: 230}, {pid: 0, id: 231}, {pid: 0, id: 232}, [{pid: 0, id: 233}, {pid: 0, id: 234}]],
      [{pid: 0, id: 220}, {pid: 0, id: 221}, [{pid: 0, id: 222}, {pid: 0, id: 223}], {pid: 0, id: 224}],
      [{pid: 0, id: 225}, {pid: 0, id: 226}, [{pid: 0, id: 228}, {pid: 0, id: 227}], {pid: 0, id: 229}],
    ],
    [
      [{pid: 0, id: 236}],
    ],
    [
      [{pid: 0, id: 239}, {pid: 0, id: 238}, {pid: 0, id: 235}],
      [{pid: 0, id: 237}, {pid: 0, id: 244}, {pid: 0, id: 241}],
    ],
    [
      [{pid: 0, id: 247}],
      [{pid: 0, id: 243}],
      [{pid: 0, id: 246}],
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
      [{pid: [19, 20, 33, 27], id: 44}, {pid: 44, id: 45}, [{pid: 44, id: 48}, {pid: 44, id: 46}], {pid: [48, 46], id: 47}],
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
      [358],
    ],
    // orders choice
    [
      [251, 256, [254, 261], 257],
      [253, 255, [258, 259], 260],
      [248, 249, 250, [262, 252]],
    ],
    // races explo choice
    [
      [263, [266, 264], 265],
      [267, [270, 268], 269],
      [271, 272, 273],
      [274, [275, 276], 277],
      [278, [279, 280], 281],
    ],
    // order quests
    [
      [285], // d
      [290], // w
      [295], // v
    ],
    [
      [282],
    ],
    [
      [286, [287, 288]], // d
      [291, [292, 293]], // w
      [296, [298, 297]], // v
    ],
    [
      [283],
    ],
    [
      [289], // d
      [294], // w
      [299], // v
    ],
    [
      [284],
    ],
  ],
  // Le dragon ancestral Zhaïtan
  '10': [
    [
      [301],
    ],
    [
      [304, [302, 303], 305], // dishonored by allies
      [309, [307, 308], 310], // letting an innocent die
      [312, 313, [315, 314]], // making another suffer
    ],
    [
      [300],
    ],
    [
      [306], // dishonored by allies
      [311], // letting an innocent die
      [316], // making another suffer
    ],
    [
      [321, [334, 335], 320],
    ],
    [
      [337, 339],
      [336, 338],
    ],
    [
      [318],
    ],
    [
      [325, 326, 327], // d
      [331, 332, 333], // w
      [328, 329, 330], // v
    ],
    [
      [322, [317, 319], 323, 324],
    ],
  ],

  // ///////// GEURRE CONTRE SCARLET ///////////
  // Leçon d histoire de la saison 1
  '39': [
    [
      [415],
    ],
  ],

  // ///////// SAISON 2 ///////////
  // 1. À l orée de Maguuma
  '11': [
    [
      [363, 362, 360, 359, 361],
    ],
  ],
  // 2. Emprise maléfique
  '12': [
    [
      [364, 365, 366, 368, 367],
    ],
  ],
  // 3. L'ombre du dragon : 1re partie
  '13': [
    [
      [371, 372, 369, 374, 373],
    ],
  ],
  // 4. L'ombre du dragon : 2e partie
  '14': [
    [
      [378, 377, 379, 375],
    ],
  ],
  // 5. Le spectre du temps
  '15': [
    [
      [384, 381, 383, 380],
    ],
  ],
  // 6. La voie des ronces
  '16': [
    [
      [386, 387, 385],
    ],
  ],
  // 7. Les graines de la vérité
  '17': [
    [
      [388, 389, 390],
    ],
  ],
  // 8. Le point de non-retour
  '18': [
    [
      [391, 392, 393],
    ],
  ],

  // ///////// HOT ///////////
  // 1. Prologue : ralliement à Maguuma
  '19': [
    [
      [411],
    ],
  ],
  // 2. Arrachés au ciel
  '32': [
    [
      [409],
    ],
  ],
  // 3. Établir une base avancée
  '41': [
    [
      [419],
    ],
  ],
  // 4. Dans la jungle
  '34': [
    [
      [405],
    ],
  ],
  // 5. Sur leurs traces
  '26': [
    [
      [421],
    ],
  ],
  // 6. Prisonniers du dragon
  '33': [
    [
      [410],
    ],
  ],
  // 7. Précieux effets
  '21': [
    [
      [407],
    ],
  ],
  // 8. Cité de l'espoir
  '20': [
    [
      [402],
    ],
  ],
  // 9. Le chemin du prédateur
  '35': [
    [
      [423],
    ],
  ],
  // 10. Curieuses observations
  '31': [
    [
      [413],
    ],
  ],
  // 11. Racines de la terreur
  '36': [
    [
      [408],
    ],
  ],
  // 12. En avant
  '23': [
    [
      [417],
    ],
  ],
  // 13. Connaissances cachées
  '22': [
    [
      [401],
    ],
  ],
  // 14. Découpe de signe
  '42': [
    [
      [418],
    ],
  ],
  // 15. Récolte amère
  '27': [
    [
      [398],
    ],
  ],
  // 16. Corps et âmes
  '25': [
    [
      [404],
    ],
  ],

  // ///////// SAISON 3 ///////////
  // 1. Hors des ombres
  '46': [
    [
      [431, 435, 432, 426, 429, 425],
    ],
  ],
  // 2. L'Embrasement
  '56': [
    [
      [441, 443, 440, 436, 442, 437, 444],
    ],
  ],
  // 3. Une fissure dans la glace
  '63': [
    [
      [453, 447, 452, 448, 449, 451, 446],
    ],
  ],
  // 4. La Tête du serpent
  '64': [
    [
      [456, 458, 457, 459, 455, 454],
    ],
  ],
  // 5. Point d'ignition
  '65': [
    [
      [466, 461, 460, 462, 464],
    ],
  ],
  // 6. À la fin du chemin
  '66': [
    [
      [469, 473, 475, 472, 468],
    ],
  ],

  // ///////// POF ///////////
  // 1. Allumer la flamme
  '83': [
    [
      [488, 503],
    ],
  ],
  // 2. Ouvrir la voie
  '67': [
    [
      [480],
    ],
  ],
  // 3. Nuit des incendies
  '82': [
    [
      [486],
    ],
  ],
  // 4. Le sacrifice
  '72': [
    [
      [482, 491],
    ],
  ],
  // 5. Souvenirs cristallins
  '79': [
    [
      [484],
    ],
  ],
  // 6. Sol consacré
  '69': [
    [
      [500],
    ],
  ],
  // 7. Affronter la vérité
  '80': [
    [
      [493],
    ],
  ],
  // 8. La marche à suivre
  '68': [
    [
      [477],
    ],
  ],
  // 9. En partance
  '71': [
    [
      [496],
    ],
  ],
  // 10. L'ennemi de mon ennemi
  '75': [
    [
      [479, 501],
    ],
  ],
  // 11. Bête de guerre
  '76': [
    [
      [483],
    ],
  ],
  // 12. Tuer un dieu
  '81': [
    [
      [481],
    ],
  ],
  // 13. Petite victoire (Épilogue)
  '78': [
    [
      [499],
    ],
  ],

  // ///////// SAISON 4 ///////////
  // 1. Aube
  '85': [
    [
      [505, 506, 509, 511, 504, 508],
    ],
  ],
  // 2. Un bug dans le système
  '86': [
    [
      [526, 525, 521, 519, 513],
    ],
  ],
  // 3. Longue vie à la liche
  '87': [
    [
      [529, 527, 533, 535, 532],
    ],
  ],
  // 4. Guidés par une étoile
  '88': [
    [
      [537, 536, 538, 540, 539],
    ],
  ],
  // 5. Quitte ou double
  '89': [
    [
      [543, 544, 545, 546, 542],
    ],
  ],
  // 6. Guerre éternelle
  '90': [
    [
      [549, 552, 548, 551, 547],
    ],
  ],

  // ///////// Icebrood saga ///////////
  // 1. prologue bound by blood
  '91': [
    [
      [553, 554, 557, 556, 555],
    ],
  ],
};

export default questsList;
