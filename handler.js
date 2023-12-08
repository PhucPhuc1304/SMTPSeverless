const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD
  }
});

module.exports.sendEmail = async (event) => {
  const { headers, body } = event;
  const accessToken = headers['access-token'];
  const apiKey = headers['x-api-key'];

  // Check API key and token
  if (accessToken !== 'phucphuctest123' || apiKey !== 'hutech_hackathon@123456') {
    return {
      statusCode: 403,
      body: JSON.stringify({ error: 'Forbidden' }),
    };
  }

  const { email, name, amount, type } = JSON.parse(body);

  const mailOptions = {
    from: process.env.FROM_EMAIL,
    to: email,
    subject: 'Thư cảm ơn',
    html: `<p>Kính gửi <strong>${name}</strong>,</p>
    <p>Tôi, thay mặt <strong>Hutech Donation Foundation</strong>, xin gửi lời cảm ơn sâu sắc và trân trọng đến bạn vì sự đóng góp quý báu của bạn với số tiền <strong>${amount} VNĐ </strong> vào dự án <strong>${type}</strong>. Sự hỗ trợ và lòng nhân ái của bạn đã có một tác động lớn và ý nghĩa đối với cộng đồng và những người cần giúp đỡ.</p>
    <p>Chúng tôi xin chắc chắn rằng mỗi đồng tiền được quyên góp sẽ được sử dụng một cách cẩn thận và có trách nhiệm. Cam kết của chúng tôi là làm việc chăm chỉ để đảm bảo rằng tất cả các nguồn lực được sử dụng hiệu quả và mang lại lợi ích tối đa cho cộng đồng.</p>
    <p>Một lần nữa, chúng tôi xin bày tỏ lòng biết ơn chân thành của mình đến bạn vì sự hỗ trợ và đóng góp của bạn. Với sự đóng góp của những người như bạn, chúng tôi có thể tiếp tục làm việc để thúc đẩy sự phát triển và cải thiện chất lượng cuộc sống của những người khó khăn hơn trong xã hội.</p>
    <p>Nếu bạn có bất kỳ câu hỏi hoặc muốn biết thêm thông tin về dự án của chúng tôi, xin vui lòng liên hệ với chúng tôi. Chúng tôi luôn sẵn lòng chia sẻ và cập nhật với bạn về tiến trình và kết quả của dự án.</p>
    <p>Một lần nữa, chân thành cảm ơn bạn về sự đóng góp quan trọng của bạn và hy vọng rằng bạn sẽ tiếp tục ủng hộ chúng tôi trong tương lai.</p>
    <p>Trân trọng,</p>
    <p><strong>Hutech Donation Foundation</strong></p>`
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully' })
    };
  } catch (error) {
    console.error('Error sending email:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error sending email' })
    };
  }
};
