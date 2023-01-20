const {DataTransformer} = require("../DataTransformer");

module.exports = {
    /**
    count number of each piece placed in hybrid slots
     * @type {DataTransformer}
     * @param options.pickup {String[]} pickup ids for pieces
     * @param options.hybrid {String[]} ids of hybrid slots
     */
    tmp: new DataTransformer("countHybrid", (dataset, outputPath, options) => {
      for(let tmp of dataset.tmps){
        var heldPiece = "";
        var placements= {}
        for(let id of options.pickup){
          placements[id] = 0;
        }
        for(let action of getPath(tmp,"actionQueue")){
          if(options.pickup.contains(action.id)){
            heldPiece = action.id
          }
          if(options.hybrid.contains(action.id)){
            console.log(`placed ${heldPiece} in ${action.id}`)
            placements[heldPiece] = placements[heldPiece] +1;
          }
        }
        setPath(tmp,outputPath,placements);
      }  
      return dataset;
    }),

    /**
     * @type {DataTransformer}
     * @param options.example {String} example parameter description
     */
    team: new DataTransformer("countHybrid", (dataset, outputPath, options) => {
        return dataset;
    })
}