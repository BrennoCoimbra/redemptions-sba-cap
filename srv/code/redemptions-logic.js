/**
 * 
 * @On(event = { "CREATE" }, entity = "loyaltyProgramSrv.Redemptions")
 * @param {Object} request - User information, tenant-specific CDS model, headers and query parameters
*/
module.exports = async function(request) {
    const { data } = request;
    const { redeemedAmount, customer } = data;

    if (redeemedAmount && customer) {
        const customerRecord = await SELECT.one().from('loyaltyProgramSrv.Customers').where({ ID: customer });

        if (customerRecord) {
            const updatedRewardPoints = customerRecord.totalRewardPoints - redeemedAmount;
            const updatedRedeemedPoints = customerRecord.totalRedeemedRewardPoints + redeemedAmount;

            if (updatedRewardPoints < 0) {
                request.reject(400, 'Insufficient reward points for redemption');
            } else {
                await UPDATE('loyaltyProgramSrv.Customers')
                    .set({
                        totalRewardPoints: updatedRewardPoints,
                        totalRedeemedRewardPoints: updatedRedeemedPoints
                    })
                    .where({ ID: customer });
            }
        } else {
            request.reject(404, 'Customer not found');
        }
    } else {
        request.reject(400, 'Redeemed amount and customer are required');
    }
}