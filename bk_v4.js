const SHA256 = require('crypto-js/sha256');
class Block{
    constructor(index,timestamp, data, previousHash ='')
    {
        this.index=index;
        this.timestamp=timestamp;
        this.data=data;
        this.previousHash = previousHash;
        this.hash = this.calcHash();
        this.nonce=0;   //this is the nonce
    }  // constructor closed but the class is not closed yet
  //npm install --save crypto-js in the terminal ';
    calcHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)+this.nonce).toString();
    }
    //We’ll add here a new method called mineBlock()  This takes a property called difficulty
    //inside we'll need the hash of a block to begin with a certain amount of zeros
    mineBlock(difficulty){
    while(this.hash.substring(0,difficulty)!== Array(difficulty+1).join("0")){
       //inside calculate the hash of this block
        this.hash=this.calcHash();
               this.nonce++; //increment the nonce as long as our hash doesn't start with enough zeros 
                                     }
    //print the hash of the block we just mined
    console.log("Block mined "+ this.hash );
    } // close the function  
}  // close Block class

class Blockchain{
    constructor(){
        this.chain=[this.createGenesisBlock()];
        this.difficulty=28;  // set the difficulty level to 1 for now
        //How do we create the first block?
    }
    createGenesisBlock(){
        return new Block(0,"01/01/2022", "Genesis Block", "0");
    }
    getLatestBlock(){
        return this.chain[this.chain.length-1];
    }
    addBlock(newBlock){
        newBlock.previousHash=this.getLatestBlock().hash;
        //now we need to do a hash update. 
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    } // end of the method
} // end of Blockchain class

let btCoin = new Blockchain();
console.log("Mining Block #1...");
btCoin.addBlock(new Block(1, "5/23/2023", {name:"TMI", amount:4}));
btCoin.addBlock(new Block(2, "5/23/2023", {name:"TM", amount:5}));
btCoin.addBlock(new Block(3, "5/23/2023", {name:"T", amount:6}));
