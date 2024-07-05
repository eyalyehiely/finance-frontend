import React from 'react';
import LineOfCreditAlert from '../../components/LineOfCreditAlert';

function NotesCard() {
  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex items-center">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">הודעות</h2>
      </header>
      <div className="text-m text-center whitespace-nowrap">
        <LineOfCreditAlert />
      </div>
    </div>
  );
}

export default NotesCard;
