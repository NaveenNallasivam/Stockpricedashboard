import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Activity, Search, User, ChevronDown } from 'lucide-react';

// Mock stock data
const stockPriceData = [
  { date: 'Jan', price: 150.25 },
  { date: 'Feb', price: 162.40 },
  { date: 'Mar', price: 158.90 },
  { date: 'Apr', price: 171.30 },
  { date: 'May', price: 168.75 },
  { date: 'Jun', price: 185.20 },
  { date: 'Jul', price: 192.50 },
  { date: 'Aug', price: 188.30 },
  { date: 'Sep', price: 195.80 },
  { date: 'Oct', price: 203.45 },
  { date: 'Nov', price: 210.90 },
  { date: 'Dec', price: 218.65 },
];

const stockRatios = [
  { label: 'Market Cap', value: '$2.85T', change: '+2.3%', positive: true },
  { label: 'P/E Ratio', value: '28.45', change: '+1.2%', positive: true },
  { label: 'EPS', value: '$7.68', change: '+5.4%', positive: true },
  { label: 'Dividend Yield', value: '0.52%', change: '-0.1%', positive: false },
  { label: '52 Week High', value: '$225.30', change: null, positive: null },
  { label: '52 Week Low', value: '$148.20', change: null, positive: null },
  { label: 'Volume', value: '52.3M', change: '+12.5%', positive: true },
  { label: 'Avg Volume', value: '48.7M', change: null, positive: null },
  { label: 'Beta', value: '1.18', change: null, positive: null },
  { label: 'ROE', value: '45.2%', change: '+3.1%', positive: true },
  { label: 'ROA', value: '18.9%', change: '+2.7%', positive: true },
  { label: 'Debt to Equity', value: '1.65', change: '-0.3%', positive: true },
];

export default function App() {
  const currentPrice = stockPriceData[stockPriceData.length - 1].price;
  const previousPrice = stockPriceData[stockPriceData.length - 2].price;
  const priceChange = currentPrice - previousPrice;
  const priceChangePercent = ((priceChange / previousPrice) * 100).toFixed(2);
  const isPositive = priceChange >= 0;

  return (
    <div className="size-full bg-gray-50 overflow-auto">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between gap-6">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">StockHub</span>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search stocks, symbols, or companies..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* My Account Section */}
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-gray-600" />
                </div>
                <div className="text-left hidden md:block">
                  <div className="text-sm font-semibold text-gray-900">My Account</div>
                  <div className="text-xs text-gray-600">john.doe@email.com</div>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-600 hidden md:block" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3">
                <Activity className="w-8 h-8 text-blue-600" />
                <h1 className="text-3xl font-bold text-gray-900">AAPL</h1>
              </div>
              <p className="text-sm text-gray-600 mt-1">Apple Inc.</p>
            </div>
            <div className="text-right">
              <div className="flex items-baseline gap-2">
                <DollarSign className="w-6 h-6 text-gray-400" />
                <span className="text-4xl font-bold text-gray-900">{currentPrice.toFixed(2)}</span>
              </div>
              <div className={`flex items-center gap-1 mt-1 justify-end ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                <span className="font-semibold">
                  {isPositive ? '+' : ''}{priceChange.toFixed(2)} ({isPositive ? '+' : ''}{priceChangePercent}%)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stock Price Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Stock Price Performance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={stockPriceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="date"
                stroke="#6b7280"
                style={{ fontSize: '12px' }}
              />
              <YAxis
                stroke="#6b7280"
                style={{ fontSize: '12px' }}
                domain={['dataMin - 10', 'dataMax + 10']}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '8px 12px'
                }}
                formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#2563eb"
                strokeWidth={2}
                dot={{ fill: '#2563eb', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Stock Ratios Grid */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Key Financial Ratios</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {stockRatios.map((ratio, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="text-sm text-gray-600 mb-1">{ratio.label}</div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{ratio.value}</div>
                {ratio.change && (
                  <div className={`text-sm font-semibold flex items-center gap-1 ${
                    ratio.positive ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {ratio.positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {ratio.change}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}