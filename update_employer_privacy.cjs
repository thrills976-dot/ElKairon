const fs = require('fs');
let code = fs.readFileSync('src/components/portal/EmployerDashboard.tsx', 'utf-8');

const privacyCard = `
          {/* Privacy & Security Card */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 col-span-1 lg:col-span-3 mt-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-display text-xl font-bold text-navy-900">Privacy & Data Management</h2>
                <p className="text-gray-500 text-sm">Control your data as promised in our Data Protection policy.</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 border border-gray-100 rounded-xl bg-gray-50">
                <h4 className="font-bold text-navy-900 mb-1">Company Visibility</h4>
                <p className="text-xs text-gray-500 mb-4">Restrict who can see your company profile.</p>
                <select className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm">
                  <option>All Candidates</option>
                  <option>Only Vetted Candidates</option>
                  <option>Private (Hidden)</option>
                </select>
              </div>
              
              <div className="p-5 border border-gray-100 rounded-xl bg-gray-50">
                <h4 className="font-bold text-navy-900 mb-1">Two-Factor Authentication</h4>
                <p className="text-xs text-gray-500 mb-4">Enable MFA for an extra layer of account security.</p>
                <button className="px-4 py-2 bg-navy-900 text-white rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-navy-800 transition-colors">
                  Enable MFA
                </button>
              </div>
              
              <div className="p-5 border border-gray-100 rounded-xl bg-gray-50 md:col-span-2 flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-navy-900 mb-1">Delete Account & Data</h4>
                  <p className="text-xs text-gray-500 max-w-md">Permanently delete your company account and all associated data from our servers.</p>
                </div>
                <button 
                  onClick={() => {
                    if(window.confirm('Are you sure you want to delete all your data? This action is irreversible.')) {
                      import('react-hot-toast').then(toast => toast.default.success('Data deletion request submitted.'));
                    }
                  }}
                  className="px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-red-100 transition-colors whitespace-nowrap"
                >
                  Request Deletion
                </button>
              </div>
            </div>
          </div>
`;

code = code.replace(
  /<\/div>\s*<\/div>\s*<\/div>\s*\);/g,
  `        </div>\n${privacyCard}\n      </div>\n    </div>\n  );`
);

fs.writeFileSync('src/components/portal/EmployerDashboard.tsx', code);
