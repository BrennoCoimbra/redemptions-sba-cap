/**
 * 
 * @On(event = { "CREATE" }, entity = "loyaltyProgramSrv.Purchases")
 * @param {Object} request - User information, tenant-specific CDS model, headers and query parameters
*/
module.exports = async function(request) {
    const { data } = request;
    
    // Calculate reward points as one tenth of the purchase value
    data.rewardPoints = Math.floor(data.purchaseValue / 10);

    // Update the total purchase value and total reward points of the related customer
    const customer = await SELECT.one.from('loyaltyProgramSrv.Customers').where({ ID: data.customer_ID });
    if (customer) {
        const updatedCustomer = {
            totalPurchaseValue: customer.totalPurchaseValue + data.purchaseValue,
            totalRewardPoints: customer.totalRewardPoints + data.rewardPoints
        };
        await UPDATE('loyaltyProgramSrv.Customers').set(updatedCustomer).where({ ID: data.customer_ID });
    }
}