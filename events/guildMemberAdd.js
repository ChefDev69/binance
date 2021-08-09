module.exports = {
    name: 'guildMemberAdd',
    once: false,
    async execute(client, member) {


        const welcomeMessage = `>>> Hello <@${member.id}>, Welcome to Monkey Business!

Nếu bạn muốn tham gia nhóm Premium thì vui lòng nhắn tin trực tiếp cho Monkey Premium Bot nhé. 
        
**Cú pháp là #Start và đọc hướng dẫn để thanh toán phí vào nhóm nhé.**
        
Chúc các bạn trading thành công và vui vẻ cùng group nhé. Trước hết các bạn nên đọc và hiểu rõ về phương pháp quản trị rủi ro của Group. Điều này giúp bạn kiểm soát được vốn và sẽ không phải lo về việc sẽ cháy tài khoản.
        
Quy định về quản trị rủi ro khi trade: https://discord.gg/hVm5p7pk
        
Bạn cố gắng dành thời gian để đọc và hiểu rõ về cách quản trị vốn, chỉ khi đó bạn mới có thể trade an toàn như những Pro trader khác. 
        
*Nếu có thắc mắc gì bạn vui lòng DM bạn @haanhduong nhé. *
        
**Monkey Business Team.**
        `

        member.send(welcomeMessage);



    },
};