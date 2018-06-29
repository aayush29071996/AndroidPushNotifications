/**
 * Created by aayush on 19/6/17.
 */
var FCM = require('fcm-push');




var serverKey = 'AAAARM4AzAM:APA91bEate_LE7CGnr06EZm5O3NgvAYvLlaB993vp1lrzesW209wA2KXoO_c6rwPrI-t8VyatAcVWsez4SZqpGbtM7Ckd1Czd_79TyGgZ6X5UeU-nGRYDb1TpvqRqiueHggLxIyhKMnA';
var fcm = new FCM(serverKey);

var message = {
    to: 'eb4oEKvit1E:APA91bEofkuLtW7wywEPH0Q2WknqHQsRwimkMxuxdaufcuQnwvovOeF4s1bjLAdQoqgCLdPhCmtnhG79yfCHgU8A9vfMMnvCXCSFtX2hTFixNysR48fM06DpPHlfQO5Th4i7MkuBSuTy', // required fill with device token or topics
    collapse_key: '',
    data: {
        your_custom_data_key: 'your_custom_data_value'
    },
    notification: {
        title: 'Light Metrics',
        body: 'Hello and Good Morning'
    }
};

//callback style
fcm.send(message, function(err, response){
    if (err) {
        console.log("Something has gone wrong!");
    } else {
        console.log("Successfully sent with response: ", response);
    }
});

//promise style
fcm.send(message)
    .then(function(response){
        console.log("Successfully sent with response: ", response);
    })
    .catch(function(err){
        console.log("Something has gone wrong!");
        console.error(err);
    })

module.exports = FCM;