import * as React from 'react';
import { LineChart, areaElementClasses } from '@mui/x-charts/LineChart';

const threadData = [
  { userId: "user_001", astId: "asst_1", threadId: "thread_1", threadTitle: "Title 1", createdAt: "2024-11-15T09:30:00.000000", updatedAt: "2024-11-15T09:45:00.000000" },
  { userId: "user_002", astId: "asst_2", threadId: "thread_2", threadTitle: "Title 2", createdAt: "2024-11-15T10:00:00.000000", updatedAt: "2024-11-15T10:30:00.000000" },
  { userId: "user_003", astId: "asst_3", threadId: "thread_3", threadTitle: "Title 3", createdAt: "2024-11-15T10:30:00.000000", updatedAt: "2024-11-15T11:00:00.000000" },
  { userId: "user_004", astId: "asst_4", threadId: "thread_4", threadTitle: "Title 4", createdAt: "2024-11-15T11:00:00.000000", updatedAt: "2024-11-15T11:30:00.000000" },
  { userId: "user_005", astId: "asst_5", threadId: "thread_5", threadTitle: "Title 5", createdAt: "2024-11-15T11:30:00.000000", updatedAt: "2024-11-15T12:00:00.000000" },
  { userId: "user_006", astId: "asst_6", threadId: "thread_6", threadTitle: "Title 6", createdAt: "2024-11-16T09:00:00.000000", updatedAt: "2024-11-16T09:30:00.000000" },
  { userId: "user_007", astId: "asst_7", threadId: "thread_7", threadTitle: "Title 7", createdAt: "2024-11-16T09:30:00.000000", updatedAt: "2024-11-16T10:00:00.000000" },
  { userId: "user_007", astId: "asst_7", threadId: "thread_7", threadTitle: "Title 7", createdAt: "2024-11-16T09:30:00.000000", updatedAt: "2024-11-14T10:00:00.000000" },
  { userId: "user_007", astId: "asst_7", threadId: "thread_7", threadTitle: "Title 7", createdAt: "2024-11-16T09:30:00.000000", updatedAt: "2024-11-14T10:00:00.000000" },
  { userId: "user_007", astId: "asst_7", threadId: "thread_7", threadTitle: "Title 7", createdAt: "2024-11-16T09:30:00.000000", updatedAt: "2024-11-16T10:00:00.000000" },
  { userId: "user_007", astId: "asst_7", threadId: "thread_7", threadTitle: "Title 7", createdAt: "2024-11-16T09:30:00.000000", updatedAt: "2024-11-16T10:00:00.000000" },
  { userId: "user_007", astId: "asst_7", threadId: "thread_7", threadTitle: "Title 7", createdAt: "2024-11-16T09:30:00.000000", updatedAt: "2024-11-16T10:00:00.000000" },
  { userId: "user_008", astId: "asst_8", threadId: "thread_8", threadTitle: "Title 8", createdAt: "2024-11-16T10:00:00.000000", updatedAt: "2024-11-16T10:30:00.000000" },
  { userId: "user_009", astId: "asst_9", threadId: "thread_9", threadTitle: "Title 9", createdAt: "2024-11-16T10:30:00.000000", updatedAt: "2024-11-16T11:00:00.000000" },
  { userId: "user_014", astId: "asst_14", threadId: "thread_14", threadTitle: "Title 14", createdAt: "2024-11-17T10:30:00.000000", updatedAt: "2024-11-17T11:00:00.000000" },
  { userId: "user_015", astId: "asst_15", threadId: "thread_15", threadTitle: "Title 15", createdAt: "2024-11-17T11:00:00.000000", updatedAt: "2024-11-17T11:30:00.000000" },
  { userId: "user_016", astId: "asst_16", threadId: "thread_16", threadTitle: "Title 16", createdAt: "2024-11-18T09:00:00.000000", updatedAt: "2024-11-18T09:30:00.000000" },
  { userId: "user_018", astId: "asst_18", threadId: "thread_18", threadTitle: "Title 18", createdAt: "2024-11-18T10:00:00.000000", updatedAt: "2024-11-18T10:30:00.000000" },
  { userId: "user_019", astId: "asst_19", threadId: "thread_19", threadTitle: "Title 19", createdAt: "2024-11-18T10:30:00.000000", updatedAt: "2024-11-18T11:00:00.000000" },
  { userId: "user_020", astId: "asst_20", threadId: "thread_20", threadTitle: "Title 20", createdAt: "2024-11-18T11:00:00.000000", updatedAt: "2024-11-18T11:30:00.000000" }
];

function countThreadsPerDate(): Record<string, number> {
  const threadCountByDate: Record<string, number> = {};
  threadData.forEach(thread => {
    const createdAtDate = new Date(thread.createdAt).toDateString();
    threadCountByDate[createdAtDate] = (threadCountByDate[createdAtDate] || 0) + 1;
  });
  return threadCountByDate;
}

const threadCounts = countThreadsPerDate();

const dates = Object.keys(threadCounts);
const counts = Object.values(threadCounts);

const formattedDates = dates.map((_, index) => index);

export default function BasicLineChart() {
  return (
    <div className="w-full h-[40vh]">
      <svg width="0" height="0">
        {/* Define the gradient in <defs> */}
        <defs>
          <linearGradient id="swich-color-id-2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#3474eb', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#a4c8f7', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
      </svg>

      <LineChart
        xAxis={[{ data: formattedDates }]}
        series={[
          {
            data: counts,
            area: true,
          },
        ]}
        sx={{
          [`& .${areaElementClasses.root}`]: {
            fill: 'url(#swich-color-id-2)', 
          },
        }}
      />
    </div>
  );
}