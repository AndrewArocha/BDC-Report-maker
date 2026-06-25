// src/pages/Home.tsx
import { motion } from 'framer-motion';

interface DashboardCardProps {
  title: string;
  value: string | number;
  trend: string;
  trendUp: boolean;
  delay: number;
  highlight?: boolean;
}

export default function Home() {
  return (
    <motion.div
      className="p-6 md:p-10 max-w-6xl mx-auto relative z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-75 bg-orange-500/5 blur-[120px] pointer-events-none rounded-full" />

      {/* Hero Banner */}
      <section className="relative w-full h-72 rounded-2xl overflow-hidden mb-10 border border-gray-200 dark:border-white/10 group cursor-pointer shadow-sm dark:shadow-none">
        <div className="absolute inset-0 bg-linear-to-br from-gray-100 to-gray-300 dark:from-gray-800 dark:to-black transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-linear-to-t from-white via-white/40 dark:from-[#05080c] dark:via-black/40 to-transparent" />

        <div className="absolute bottom-0 left-0 p-8 w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                <span className="text-orange-500 dark:text-orange-400 font-bold tracking-wider text-xs uppercase mb-2 block">System Online</span>
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-2 text-gray-900 dark:text-white">NJ Auto Xchange Hub</h1>
                <p className="text-gray-600 dark:text-gray-400 max-w-lg text-sm md:text-base">Your automated lead parsing and GoHighLevel workflows are running smoothly. Ready to generate today's report?</p>
            </motion.div>
          </div>

          <button className="bg-gray-900 text-white dark:bg-white dark:text-black px-6 py-3 rounded-lg font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors shadow-lg dark:shadow-[0_0_20px_rgba(255,255,255,0.15)] focus-visible:ring-2 focus-visible:ring-orange-500 outline-none w-full md:w-auto">
            Generate New Report
          </button>
        </div>
      </section>

      {/* Dashboard Preview Cards */}
      <section>
        <h2 className="text-xl font-semibold mb-6 tracking-wide text-gray-800 dark:text-gray-200">Recent Activity</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <DashboardCard
            title="Total Leads Processed"
            value="1,248"
            trend="+12% this week"
            trendUp={true}
            delay={0.4}
          />
          <DashboardCard
            title="Pending Handoffs"
            value="34"
            trend="Action required"
            trendUp={false}
            delay={0.5}
          />
          <DashboardCard
            title="AI Assistant Insights"
            value="3 New"
            trend="Check Insights tab"
            trendUp={true}
            delay={0.6}
            highlight={true}
          />
        </div>
      </section>
    </motion.div>
  );
}

function DashboardCard({ title, value, trend, trendUp, delay, highlight = false }: DashboardCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay, duration: 0.5 }}
      tabIndex={0}
      className={`p-6 rounded-xl border focus-visible:ring-2 focus-visible:ring-orange-500 outline-none ${highlight ? 'bg-orange-50 dark:bg-orange-500/5 border-orange-200 dark:border-orange-500/20' : 'bg-white dark:bg-white/5 border-gray-200 dark:border-white/5'} hover:bg-gray-50 dark:hover:bg-white/10 transition-colors cursor-pointer relative overflow-hidden shadow-sm dark:shadow-none`}
    >
      <h3 className="text-gray-500 dark:text-gray-400 font-medium text-sm mb-2">{title}</h3>
      <p className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{value}</p>
      <p className={`text-xs font-medium ${trendUp ? (highlight ? 'text-orange-600 dark:text-orange-400' : 'text-emerald-600 dark:text-emerald-400') : 'text-rose-600 dark:text-rose-400'}`}>
        {trend}
      </p>
    </motion.div>
  );
}