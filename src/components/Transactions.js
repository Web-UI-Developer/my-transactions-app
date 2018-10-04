import React, { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Link } from "react-router-dom";
import { Checkbox } from 'primereact/checkbox';
import { Card } from 'primereact/card';
import TransactionService from '../services/TransactionServices'

class Transactions extends Component {

    constructor() {
        super();
        this.state = {
            txns: [],
            selectedAccounts: [],
            selectedTxnTypes: []
        };
        this.accTemplate = this.accTemplate.bind(this);
        this.onFilterApplied = this.onFilterApplied.bind(this);
        this.onTxnFilterApplied = this.onTxnFilterApplied.bind(this);
        this.transactionService = new TransactionService();
    }

    componentWillMount() {
        this.setState({ txns: this.props.txns });
    }

    accTemplate(rowData, column) {
        return (<Link to={'/txnDetails/' + rowData.account}>{rowData.account}</Link>);
    }

    onFilterApplied(e) {
        let selectedFilters = [...this.state.selectedAccounts];
        if (e.checked)
            selectedFilters.push(e.value);
        else
            selectedFilters.splice(selectedFilters.indexOf(e.value), 1);
        this.setState({ txns: this.transactionService.getFilteredTransactions(selectedFilters, this.state.selectedTxnTypes), selectedAccounts: selectedFilters });
    }

    onTxnFilterApplied(e) {

        let selectedFilters = [...this.state.selectedTxnTypes];
        if (e.checked)
            selectedFilters.push(e.value);
        else
            selectedFilters.splice(selectedFilters.indexOf(e.value), 1);
        this.setState({ txns: this.transactionService.getFilteredTransactions(this.state.selectedAccounts, selectedFilters), selectedTxnTypes: selectedFilters });
    }

    render() {

        return (
            <div >
                <div className="content-section introduction">
                    <div className="feature-intro">
                        <h1>My Transactions</h1>
                        <hr />
                    </div>
                    <div className='pull-right'><h4><Link to="/home">Home</Link></h4></div>
                </div>
                <div className='row'>
                    <div className='col-sm-3'>

                        <div className='row'>
                            <h4>Filters</h4>
                            <Card>
                                <div className='well'>
                                    <h4>Account Name</h4>
                                    <div className="p-col-12">
                                        <Checkbox inputId="cb1" value="Savings Account" onChange={this.onFilterApplied} checked={this.state.selectedAccounts.includes('Savings Account')} ></Checkbox>
                                        <label htmlFor="cb1" className="p-checkbox-label">Savings Account</label>
                                    </div>
                                    <div className="p-col-12">
                                        <Checkbox inputId="cb2" value="Checking Account" onChange={this.onFilterApplied} checked={this.state.selectedAccounts.includes('Checking Account')}></Checkbox>
                                        <label htmlFor="cb2" className="p-checkbox-label">Checking Account</label>
                                    </div>
                                    <div className="p-col-12">
                                        <Checkbox inputId="cb3" value="Auto Loan Account" onChange={this.onFilterApplied} checked={this.state.selectedAccounts.includes('Auto Loan Account')}></Checkbox>
                                        <label htmlFor="cb3" className="p-checkbox-label">Auto Loan Account</label>
                                    </div>
                                    <div className="p-col-12">
                                        <Checkbox inputId="cb4" value="Credit Card Account" onChange={this.onFilterApplied} checked={this.state.selectedAccounts.includes('Credit Card Account')}></Checkbox>
                                        <label htmlFor="cb4" className="p-checkbox-label">Credit Card Account</label>
                                    </div>
                                    <div className="p-col-12">
                                        <Checkbox inputId="cb5" value="Investment Account" onChange={this.onFilterApplied} checked={this.state.selectedAccounts.includes('Investment Account')}></Checkbox>
                                        <label htmlFor="cb5" className="p-checkbox-label">Investment Account</label>
                                    </div>
                                    <div className="p-col-12">
                                        <Checkbox inputId="cb6" value="Personal Loan Account" onChange={this.onFilterApplied} checked={this.state.selectedAccounts.includes('Personal Loan Account')}></Checkbox>
                                        <label htmlFor="cb6" className="p-checkbox-label">Personal Loan Account</label>
                                    </div>
                                    <div className="p-col-12">
                                        <Checkbox inputId="cb7" value="Home Loan Account" onChange={this.onFilterApplied} checked={this.state.selectedAccounts.includes('Home Loan Account')}></Checkbox>
                                        <label htmlFor="cb7" className="p-checkbox-label">Home Loan Account</label>
                                    </div>
                                    <div className="p-col-12">
                                        <Checkbox inputId="cb8" value="Money Market Account" onChange={this.onFilterApplied} checked={this.state.selectedAccounts.includes('Money Market Account')}></Checkbox>
                                        <label htmlFor="cb8" className="p-checkbox-label">Money Market Account</label>
                                    </div>
                                </div>
                            </Card>

                        </div>

                        <br />

                        <div className='row'>

                            <Card>
                                <div className='well'>
                                    <h4>Transaction Type</h4>
                                    <div className="p-col-12">
                                        <Checkbox inputId="cb11" value="deposit" onChange={this.onTxnFilterApplied} checked={this.state.selectedTxnTypes.includes('deposit')}></Checkbox>
                                        <label htmlFor="cb11" className="p-checkbox-label">Deposit</label>
                                    </div>
                                    <div className="p-col-12">
                                        <Checkbox inputId="cb12" value="withdrawal" onChange={this.onTxnFilterApplied}
                                            checked={this.state.selectedTxnTypes.includes('withdrawal')}></Checkbox>
                                        <label htmlFor="cb12" className="p-checkbox-label">WithDrawal</label>
                                    </div>
                                    <div className="p-col-12">
                                        <Checkbox inputId="cb13" value="invoice" onChange={this.onTxnFilterApplied}
                                            checked={this.state.selectedTxnTypes.includes('invoice')}></Checkbox>
                                        <label htmlFor="cb13" className="p-checkbox-label">Invoice</label>
                                    </div>
                                    <div className="p-col-12">
                                        <Checkbox inputId="cb14" value="payment" onChange={this.onTxnFilterApplied}
                                            checked={this.state.selectedTxnTypes.includes('payment')}></Checkbox>
                                        <label htmlFor="cb14" className="p-checkbox-label">Payment</label>
                                    </div>
                                </div>
                            </Card>
                        </div>

                    </div>
                    <div className='col-sm-9'>
                    <Card>
                        <div className="content-section implementation">
                            <DataTable value={this.state.txns} paginator={true} rows={25} responsive={true}>
                                <Column key='account' field='account' body={this.accTemplate} header='Account No' />
                                <Column key='accountName' field='accountName' header='Account Name' />
                                <Column key='currencyCode' field='currencyCode' header='Currency Code' />
                                <Column key='amount' field='amount' header='Amount' />
                                <Column key='transactionType' field='transactionType' header='Transaction Type' />
                            </DataTable>
                        </div>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
}

export default Transactions;
