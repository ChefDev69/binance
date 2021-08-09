const { Spot } = require('@binance/connector');
const config = require('../config.json');
const fs = require('fs');
const apiKey = 'SvkSDVxPZH1vHzSoh9QRi697gNOxO8Ma0skoOYcPNcEJe64WkjUodhlIcsIKskbZ'
const apiSecret = 'f4ymZRYrGWPMMjt7cPtSeZYCBSeFuFq4zyafZV3TSJNyjQ6IUU8OZtDEUIC27UhF'

module.exports = {

    name: 'start',
    description: '',
    async execute(client, message, args) {


        let reply = `>>> Hi <@${message.author.id}>, Welcome to **Monkey Premium**.

==============================
**CÁCH THANH TOÁN PHÍ PREMIUM MEMBER**
        
Phí tham gia **Monkey Premium** sẽ có 3 hình thức, các bạn có thể chọn hình thức phù hợp với mình nhất:
        
1. Monthly (1 tháng): **$ 60 / tháng**
2. Year (1 năm): **$ 500 / năm**
3.  Lifetime (Vĩnh viễn): **$ 900**
        
Vui lòng trả lời bằng 1 hoặc 2 hoặc 3 để chọn gói
        `;

        const userDM = await message.author.createDM();

        userDM.send(reply);

        const filter = m => { if (m.author.bot) { return false } return (m.content === '1' || m.content === '2' || m.content === '3') };
        const collector = userDM.createMessageCollector({ filter: filter, time: 300000 });

        collector.on('collect', m => {


            switch (m.content) {
                case '1':
                    m.reply(`>>> Vui lòng chuyển **$60** trực tiếp vào địa chỉ ví sau:
                    **0x98e55046f36d98b1e3f19feaa96b71f5adab1716**

Vui lòng chắc chắn chọn đúng Network là **BSC (Binance Smart Chain – BEP20)**. Nếu bạn chọn sai thì có khả năng số tiền chuyển sẽ bị mất, do sai địa chỉ và mất luôn không ai nhận được hay rút được.

Sau khi thanh toán, bạn vui lòng copy TxID của giao dịch và paste vào đây theo cú pháp sau:

1. Nếu chuyển từ Binance: Cú pháp gõ đầy đủ: **Internal Transfer XXXXXXX** (với X là dãy số TxID của giao dịch bạn vừa chuyển). 

Ví dụ: **Internal Transfer 12345678**

2. Nếu chuyển từ ví khác: **Copy toàn bộ TxID**.`);

                    break;

                case '2':




                    m.reply(`>>> Vui lòng chuyển **$500** trực tiếp vào địa chỉ ví sau:
                    **0x98e55046f36d98b1e3f19feaa96b71f5adab1716**

Vui lòng chắc chắn chọn đúng Network là **BSC (Binance Smart Chain – BEP20)**. Nếu bạn chọn sai thì có khả năng số tiền chuyển sẽ bị mất, do sai địa chỉ và mất luôn không ai nhận được hay rút được.

Sau khi thanh toán, bạn vui lòng copy TxID của giao dịch và paste vào đây theo cú pháp sau:

1. Nếu chuyển từ Binance: Cú pháp gõ đầy đủ: **Internal Transfer XXXXXXX** (với X là dãy số TxID của giao dịch bạn vừa chuyển). 

Ví dụ: **Internal Transfer 12345678**

2. Nếu chuyển từ ví khác: **Copy toàn bộ TxID**.`);


                    break;


                case '3':

                    m.reply(`>>> Vui lòng chuyển **$900** trực tiếp vào địa chỉ ví sau:
                    **0x98e55046f36d98b1e3f19feaa96b71f5adab1716**

Vui lòng chắc chắn chọn đúng Network là **BSC (Binance Smart Chain – BEP20)**. Nếu bạn chọn sai thì có khả năng số tiền chuyển sẽ bị mất, do sai địa chỉ và mất luôn không ai nhận được hay rút được.

Sau khi thanh toán, bạn vui lòng copy TxID của giao dịch và paste vào đây theo cú pháp sau:

1. Nếu chuyển từ Binance: Cú pháp gõ đầy đủ: **Internal Transfer XXXXXXX** (với X là dãy số TxID của giao dịch bạn vừa chuyển). 

Ví dụ: **Internal Transfer 12345678**

2. Nếu chuyển từ ví khác: **Copy toàn bộ TxID**.`);


                    break;
            }



            Option1(m, client)

            collector.stop()

        });




    }

}

const Option1 = async (message, discordClient) => {


    const client = new Spot(apiKey, apiSecret)

    const filter = m => m.author.bot ? false : true;
    const collector = message.channel.createMessageCollector({ filter, time: 300000 });

    collector.on('collect', async m => {

        collector.stop();

        const usersJSON = JSON.parse(fs.readFileSync('./users.json'));

        const existingID = usersJSON.users.filter(user => user.txId == m.content);

        if (existingID.length) return m.reply(`>>> Chào <@${m.author.id}>, hệ thống vẫn chưa thấy giao dịch của bạn, vui lòng kiểm tra lại cú pháp và gửi lại lần nữa. Nếu vẫn gặp lỗi này bạn vui lòng liên hệ trực tiếp với Admin để được nâng cấp thủ công nhé. `)


        let { data } = await client.depositHistory();

        let timeWindow = 2592000000; // 30 days

        data = data.filter(data => data.txId === m.content)

        if (!data.length) return m.reply(`>>> Chào <@${m.author.id}>, hệ thống vẫn chưa thấy giao dịch của bạn, vui lòng kiểm tra lại cú pháp và gửi lại lần nữa. Nếu vẫn gặp lỗi này bạn vui lòng liên hệ trực tiếp với Admin để được nâng cấp thủ công nhé. `)

        if (data.amount >= 498 && data.amount <= 505) timeWindow = 31556952000;

        if (data.amount >= 898 && data.amount <= 1000) timeWindow = 631139040000;

        if (Date.now() - data.insertTime > timeWindow) return m.reply(`>>> Chào <@${m.author.id}>, hệ thống vẫn chưa thấy giao dịch của bạn, vui lòng kiểm tra lại cú pháp và gửi lại lần nữa. Nếu vẫn gặp lỗi này bạn vui lòng liên hệ trực tiếp với Admin để được nâng cấp thủ công nhé. `)

        m.reply(`>>> Chúc mừng bạn đã tham gia vào **Monkey Premium**. Chúc các bạn sẽ thành công với Crypto cùng Monkey Business.`)

        usersJSON.users.push({
            userID: m.author.id,
            txId: data[0].txId,
            insertTime: data[0].insertTime,
            timeWindow: timeWindow
        });

        fs.writeFileSync('./users.json', JSON.stringify(usersJSON));

        const guild = await discordClient.guilds.cache.get(config.guildID);
        const member = await guild.members.cache.get(m.author.id);
        member.roles.add(config.premiumRole);

    })



}