const database = {
    businesses: [
      {
        BusinessID: 1,
        BusinessName: "Tech Solutions",
        Email: "tech@example.com",
        Password: "hashed_password",
        LoginCredentials: {
          Username: "tech_user",
          Password: "hashed_password",
        },
        DashboardConfiguration: {
          DashboardID: 1,
          Widgets: ["Sales Chart", "Inventory Overview"],
        },
        Inventory: [
          {
            ProductID: 1,
            ProductName: "Laptop",
            QuantityAvailable: 50,
            UnitPrice: 800,
          },
          // Add more inventory items as needed
        ],
        Orders: [
          {
            OrderID: 1,
            ProductID: 1,
            OrderDate: "2023-12-01",
            QuantityOrdered: 5,
            OrderStatus: "Shipped",
          },
          // Add more orders as needed
        ],
        DynamicURLs: [
          {
            DynamicURL: "tech-solutions-url",
            URLDescription: "Tech Solutions Products",
            URLValidity: true,
          },
          // Add more dynamic URLs as needed
        ],
        SalesReports: [
          {
            ReportID: 1,
            ReportDate: "2023-12-01",
            TotalSales: 4000,
          },
          // Add more sales reports as needed
        ],
      },
      // Add more businesses as needed
    ],
  };
  
  export default database;
  