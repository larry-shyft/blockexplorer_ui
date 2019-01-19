package types

import "time"

type BlockPayload struct {
	Payload []Block			`json:"data"`
}

type Block struct {
	Hash       string 		`json:"block_hash"`
	Coinbase   string 		`json:"coinbase_hash"`
	Age        time.Time	`json:"block_timestamp"`
	ParentHash string		`json:"block_parenthash"`
	UncleHash  string		`json:"block_unclehash"`
	Difficulty string		`json:"block_difficulty"`
	Size       string		`json:"block_size"`
	Rewards    string		`json:"block_rewards"`
	Number     string		`json:"block_height"`
	GasUsed    uint64		`json:"block_gas"`
	GasLimit   uint64		`json:"block_gaslimit"`
	Nonce      uint64		`json:"block_nonce"`
	TxCount    int			`json:"block_txs"`
	UncleCount int			`json:"block_uncles"`
}

type TransactionPayload struct {
	Payload []Transaction
}

type Transaction struct {
	TxHash      string		`json:"tx_hash"`
	To_addr     string		`json:"to_address"`
	From_addr   string		`json:"from_address"`
	BlockHash   string		`json:"block_hash"`
	BlockNumber string		`json:"block_height"`
	Amount      string		`json:"tx_amount"`
	GasPrice    uint64		`json:"gas_price"`
	Gas         uint64		`json:"tx_gas"`
	GasLimit    uint64		`json:"gas_limit"`
	TxFee       string		`json:"tx_cost"`
	Nonce       uint64		`json:"tx_nonce"`
	TxStatus    string		`json:"tx_status"`
	IsContract  bool		`json:"is_contract"`
	Age         time.Time	`json:"tx_timestamp"`
	Data        []byte		`json:"tx_data"`
}

type AccountPayload struct {
	Payload []Account
}

type Account struct {
	Addr         string		`json:"address"`
	Balance      string		`json:"balance"`
	Nonce		 string		`json:"nonce"`
}

type InternalTransactionPayload struct {
	Payload []InteralTransaction
}

type InteralTransaction struct {
	ID        int		`json:"internal_id"`
	Hash      string	`json:"tx_hash"`
	BlockHash string	`json:"block_hash"`
	Action    string	`json:"internal_action"`
	From      string	`json:"from_address"`
	To        string	`json:"to_address"`
	Value     string	`json:"tx_amount"`
	Gas       uint64	`json:"internal_gas"`
	GasUsed   uint64	`json:"gas_used"`
	Input     string	`json:"internal_input"`
	Output    string	`json:"internal_output"`
	Time      string	`json:"internal_time"`
}

// AccountBlock - struct for reading and writing database data
type AccountBlock struct {
	Acct      string `db:"acct"`
	Blockhash string `db:"blockhash"`
	Delta     int64  `db:"delta"`
	TxCount   int64  `db:"txcount"`
}

type AccountBlockArray struct {
	AccountBlocks []AccountBlock
}
