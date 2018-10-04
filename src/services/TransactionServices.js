import tranactionObj from '../data/data';
import axios from "axios";

class TransactionService {

    constructor(){
        this.tranactionOb = tranactionObj;
    }
    
    getTransactions(){
        return this.tranactionOb.transactions;
    }

    getTransactionsFromServer(cb){
        return axios.get('/data/data.json').then(resp=>{
            // console.log('from server: ',resp);
            if(resp.status === 200){
                this.tranactionOb = resp.data;
                // console.log('from txnsFromServer: ',this.tranactionOb);
                cb(this.tranactionOb.transactions)
            } else {
                console.log(resp.data);
            }
        }).catch(err=>{
            console.log(err);
        });
    }

    getTransactionsByAccNum(accNum){
        var txn = this.tranactionOb.transactions.filter(val=>
            val.account === accNum
        );
        return txn[0];
    }

    getTransactionsByAccName(accountNames){
        if(accountNames.length === 0){
            return this.getTransactions();
        }
        
        var txns = this.tranactionOb.transactions.filter(val=>
            accountNames.includes(val.accountName)
        );
        return txns;
    }

    getFilteredTransactions(accountNames, txnTypes){
        if(accountNames.length === 0){
            return this.getTransactionsByTxnType(txnTypes);
        }
        if(txnTypes.length === 0){
            return this.getTransactionsByAccName(accountNames);
        }
        var txns = this.tranactionOb.transactions.filter(val=>
            txnTypes.includes(val.transactionType) && accountNames.includes(val.accountName)
        );
        return txns;
    }

    getTransactionsByTxnType(txnTypes){
        if(txnTypes.length === 0){
            return this.getTransactions();
        }
        var txns = this.tranactionOb.transactions.filter(val=>
            txnTypes.includes(val.transactionType)
        );
        return txns;
    }
}

 export default TransactionService;