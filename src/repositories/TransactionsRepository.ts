import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const allTransactions = this.transactions;

    const totalIncome = allTransactions
      .filter(elem => elem.type === 'income')
      .reduce((acc, elem) => {
        return acc + elem.value;
      }, 0);
    const totalOutcome = allTransactions
      .filter(elem => elem.type === 'outcome')
      .reduce((acc, elem) => {
        return acc + elem.value;
      }, 0);

    const totalAll = totalIncome - totalOutcome;
    return {
      income: totalIncome,
      outcome: totalOutcome,
      total: totalAll,
    };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
