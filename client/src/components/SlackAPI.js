const getSlackUsers = ({name, callback}) => {

    fetch(`https://www.waview.ch/wavbot/person/?command=Get&name=${name}`)
        .then(result => result.json())
        .then((output) => {
            console.log("JSON" , output['message']);
            callback(output['message']);
        })
        .catch(err => console.error(err));
};

const transactionsSlackUsers = ({code, callback}) => {
    fetch(`https://www.waview.ch/wavbot/pay/transactions.php/?command=${code}`)
        .then(result => result.json())
        .then((output) => {
            console.log("JSON" , output['message']);
            callback(output['message']);
        })
        .catch(err => console.error(err));
};

module.exports = { getSlackUsers, transactionsSlackUsers };