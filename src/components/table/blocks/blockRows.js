import React, { Component } from 'react';
import BlockTable from './blockTable';
import Loading from '../../UI materials/loading'
import Pagination from '../pagination/pagination';
import classes from './table.css';
import axios from "axios/index";

import {API_URL} from "../../../constants/apiURL";

class BlocksTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            emptyDataSet: true
        };
    }

    async componentDidMount() {
        let pageLimit= 25;
        let currentPage = 1;
        try {
            const response = await axios.get(`${API_URL}/get_all_blocks_length`);
            await this.setState({totalRecords: response.data});
            try {
                const response = await axios.get(`${API_URL}/get_all_blocks/${currentPage}/${pageLimit}`);
                if(response.data === "\n") {
                    this.setState({emptyDataSet: true})
                } else {
                    this.setState({emptyDataSet: false})
                }
                await this.setState({data: response.data});
            } catch (err) {
                console.log(err);
            }
        } catch (err) {
            console.log(err);
        }
    }

    onPageChanged = async(data) => {
        const { currentPage, pageLimit } = data;

        try {
            const response = await axios.get(`${API_URL}/get_all_blocks/${currentPage}/${pageLimit}`);
            if(response.data === "\n") {
                this.setState({emptyDataSet: true})
            } else {
                this.setState({emptyDataSet: false})
            }
            await this.setState({data: response.data});
        } catch (err) {
            console.log(err);
        }
    };

    render() {
        let table;
        if(this.state.emptyDataSet === false && this.state.data.length > 0  ) {
            table = this.state.data.map((data, i) => {
                const conversion = data.block_rewards / 10000000000000000000;
                return <BlockTable
                    key={`${data.block_hash}${i}`}
                    Hash={data.block_hash}
                    Number={data.block_height}
                    Coinbase={data.coinbase_hash}
                    AgeGet={data.block_timestamp}
                    GasUsed={data.block_gas}
                    GasLimit={data.block_gaslimit}
                    UncleCount={data.block_uncles}
                    TxCount={data.block_txs}
                    Reward={conversion}
                    detailBlockHandler={this.props.detailBlockHandler}
                    getBlocksMined={this.props.getBlocksMined}
                />
            });
        }

        let combinedClasses = ['responsive-table', classes.table];
        return (
            <div>
                {
                     this.state.emptyDataSet === false && this.state.data.length > 0  ?
                            <table className={combinedClasses.join(' ')}>
                                <thead>
                                    <tr>
                                        <th scope="col" className={classes.thItem}> Height </th>
                                        <th scope="col" className={classes.thItem}> Block Hash </th>
                                        <th scope="col" className={classes.thItem}> Age </th>
                                        <th scope="col" className={classes.thItem}> Txn </th>
                                        <th scope="col" className={classes.thItem}> Uncles </th>
                                        <th scope="col" className={classes.thItem}> Coinbase </th>
                                        <th scope="col" className={classes.thItem}> GasUsed </th>
                                        <th scope="col" className={classes.thItem}> GasLimit </th>
                                        <th scope="col" className={classes.thItem}> Avg.GasPrice </th>
                                        <th scope="col" className={classes.thItem}> Reward </th>
                                    </tr>
                                </thead>
                                {table}
                                <div id={classes.pages}>
                                    <Pagination totalRecords={this.state.totalRecords.page_count} pageLimit={25} pageNeighbours={1} onPageChanged={this.onPageChanged} />
                                </div>
                            </table>
                    : <Loading>Blocks</Loading>
                }
            </div>
        );
    }
}
export default BlocksTable;
