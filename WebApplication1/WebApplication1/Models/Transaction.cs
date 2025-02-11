namespace FinanceTrackerApi.Models
{
    public class Transaction
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; }
        public int CategoryId { get; set; }
        public Category Category { get; set; }
        public bool IsExpense { get; set; } // true = Expense, false = Income
    }

}
