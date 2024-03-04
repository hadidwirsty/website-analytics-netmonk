const generateMetabaseEmbedUrl = require('../utils/generateMetabase');

const sendDashboardUrl = (dashboardId) => async (req, res) => {
  try {
    const url = generateMetabaseEmbedUrl({ type: 'dashboard', id: dashboardId }, {});
    res.json({ url });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  sendCustomerManagement: sendDashboardUrl(6),
  sendOverviewUrl: sendDashboardUrl(7),
  sendDevicePelangganUrl: sendDashboardUrl(8),
  sendActiveUsersUrl: sendDashboardUrl(9),
  sendTrackingOrderNcxUrl: sendDashboardUrl(12)
};
