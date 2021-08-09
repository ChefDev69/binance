var CronJob = require('cron').CronJob;
const config = require('./config.json');
const fs = require('fs');


module.exports = async (client) => {


    var job = new CronJob('0 0 0 * * *', async () => {


        const usersJSON = JSON.parse(fs.readFileSync('./users.json'));
        const channel = await client.channels.cache.get(config.welcomeChannel);


        usersJSON.users.map(async user => {



            if (Date.now() - user.insertTime < user.windowTime && Date.now() - user.insertTime >= (user.windowTime - 63113904000)) {

                channel.send(`>>> Chào <@${user.userID}>, 

Chỉ còn 2 ngày nữa là hết hạn **Monkey Premium**, cảm ơn bạn đã tham gia cùng group.
                
Nếu muốn gia hạn thanh toán, vui lòng dùng cú pháp **#repayment** để gia hạn.
                
Cảm ơn và chúc bạn tiếp tục trading thành công cùng **Monkey Business**
                
**Monkey Business Team**`)

            }

            if (Date.now() - user.insertTime >= user.timeWindow) {

                const newUsers = usersJSON.users.filter(user => user.userID !== user.userID);
                fs.writeFileSync('./users.json', JSON.stringify({ users: newUsers }));
                const member = await channel.guild.members.cache.get(user.userID);
                member.roles.remove(config.premiumRole);


            }


        })



    }, null, true, 'America/Los_Angeles');



    job.start();



}

