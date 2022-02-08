/// <reference path="knight.ts" />

class GameAI {
    // let the AI choose a move, and update both the
    // knight and the gamestate
    
    public static moveKnight(king:King, knights: Knight[], gameState:GameState) {
        let t0 = performance.now();

         // TODO: remove random move, amnd replace with AI move

        // RANDOM MOVE - START ------------------

        console.log(king); // only to avoid error: 'king' is declared but its value is never read.

        // choose knight to move
        let i:number =  Math.floor(Math.random() * Math.floor(knights.length));

        let legalMoves: [number, number][] = knights[i].getMoves();

        console.log(legalMoves);

        let j:number =  Math.floor(Math.random() * Math.floor(legalMoves.length));

        knights[i].setPosition(legalMoves[j]);
        gameState.knightPositions[i] = legalMoves[j];

        // RANDOM MOVE - END   ------------------

        let t1 = performance.now();
        console.log("AI move took " + (t1 - t0) + " milliseconds.");

        let scores = [3, 5, 2, 9, 12, 5, 23, 23];
        /**
         * first max so 5
         * then min so 2
         * then max so 12
         * then min 23
         * 
         * new row
         * then max so 5
         * then min so 12
         * 
         * new row
         * max so 12
         */
        let n = scores.length;
        let h = this.log2(n);
        let res = this.miniMax(0, 0, true, scores, h);
        console.log( "The optimal value is : "  +res);
    }

    /**
     * Function for the minimax algorithm.
     * @param {number} depth - Depth of the game tree 
     * @param {number} index - Index of the current node 
     * @param {boolean} isMax - If true is maximizer else minimizer 
     * @param {Array<number>} scores - Leaves of the game tree
     * @param {number} height - Height of the game tree
     * @returns 
     */
    public static miniMax(depth: number, index: number, isMax: boolean, scores: Array<number>, height: number): any {
        if (depth == height) return scores[index];

        if (isMax) {
            return Math.max(this.miniMax(depth + 1, index * 2, false, scores, height),
            this.miniMax(depth + 1, index * 2 + 1, false, scores, height));
        } else {
            return Math.min(this.miniMax(depth + 1, index * 2, true, scores, height),
            this.miniMax(depth + 1, index * 2 + 1, true, scores, height));
        }
    }

    public static log2(n: any): any
    {
    return (n==1)? 0 : 1 + this.log2(n/2);
    }

}