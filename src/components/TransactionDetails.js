import React, { Component } from 'react';
import TransactionService from '../services/TransactionServices'
import { Card } from 'primereact/card';

class TransactionDetails extends Component {

    constructor() {
        super();
        this.state = {
            txn: {}
        };
        this.transactionService = new TransactionService();
    }

    componentWillMount() {
        this.setState({ txn: this.transactionService.getTransactionsByAccNum(this.props.match.params.accNum) });
    }

    render() {
        return (
            <div>
                <br />
                <br />
                <Card title={"Transaction " + this.state.txn.account}>
                    <hr />
                    <div className="content-section implementation">
                        <b>Account No. :</b> {this.state.txn.account}<br />
                        <b>Account Name : </b>{this.state.txn.accountName}<br />
                        <b>Curreny Code : </b>{this.state.txn.currencyCode}<br />
                        <b>Amount :</b> {this.state.txn.amount}<br />
                        <b>Transaction Type : </b>{this.state.txn.transactionType}<br />
                    </div>
                </Card>
            </div>
        );
    }
}

export default TransactionDetails;
