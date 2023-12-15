# Hướng dẫn thiết lập cấu hình và chạy project
Sử dụng xampp để chạy php và mysql cho server, sử dụng react cho client.

Sau khi clone project về, thực hiện setup theo thứ tự:
## Setup apache
- Cài đặt xampp (nếu chưa), tắt xampp apache server (nếu đang chạy).

- Vào thư mục config của Apache, đường dẫn thường sẽ là C:\xampp\apache\conf (là thư mục bạn chọn để instal xampp), mở file 'httpd.conf'.
- Tìm kiếm dòng 'Listen 80', sau đó thêm dòng 'Listen 9000' ở dưới, port 9000 là sẽ là port tiếp nhận lời gọi api từ client.
- Vẫn trong file 'httpd.conf', tìm kiếm 'AllowOverride' và tìm đến phần có nội dung như sau (hoặc gần giống vậy):
```
DocumentRoot "D:/xampp/htdocs"
<Directory "D:/xampp/htdocs">
    #
    # Possible values for the Options directive are "None", "All",
    # or any combination of:
    #   Indexes Includes FollowSymLinks SymLinksifOwnerMatch ExecCGI MultiViews
    #
    # Note that "MultiViews" must be named *explicitly* --- "Options All"
    # doesn't give it to you.
    #
    # The Options directive is both complicated and important.  Please see
    # http://httpd.apache.org/docs/2.4/mod/core.html#options
    # for more information.
    #
    Options Indexes FollowSymLinks Includes ExecCGI

    #
    # AllowOverride controls what directives may be placed in .htaccess files.
    # It can be "All", "None", or any combination of the keywords:
    #   AllowOverride FileInfo AuthConfig Limit
    #
    AllowOverride All

    #
    # Controls who can get stuff from this server.
    #
    Require all granted
</Directory>
```

 - Thêm vào phía dưới phần vừa tìm thấy nội dung sau:
```
<VirtualHost *:9000>
    DocumentRoot "path/to/your/project"
    ServerName localhost

    <Directory "path/to/your/project">
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```
	
- "path/to/your/project" là đường dẫn đến thư mục clone của project này, ví dụ trên máy mình sẽ là "C:/Users/ADMIN/HK231/Web/BTL/nestseek" (kiểm tra xem bạn có để đúng kí tự '/' hay không)

- Lưu file file và khởi động apache từ xampp control panel
- Bạn có thể test xem đã set up thành công chưa. Mở trình duyệt bất kì và nhập "localhost:9000/test.php", nếu trình duyệt hiện "Hello World" thì bạn đã setup thành công.


## Setup mysql: 
(Cập nhật: 23/11/2023, hiện tại vẫn chưa có file data base nên vui lòng sử dụng file data giả trong folder client/src/dummyData và bỏ qua bước setup mysql)
(Cập nhật: 15/12/2023 đã cập nhật file database: nestseek.sql trong thư mục server/config)
- Khởi động MySQL trong xampp, mở trang localhost thông thường và vào mục phpmyadmin, (http://localhost/phpmyadmin/)
- Chọn import file sql trên thanh công cụ, chọn file nestseek.sql và nhấn import

## Setup client:
- Cài đặt nodejs, npm, npx (nếu chưa cài)
- Mở command line trong thư mục clone và nhập lệnh sau:
```bash 
cd client
npm install
```
- Chờ đến khi install node_modules xong.

## Chạy project:
Vậy là đã xong phần setup, để chạy project, bạn cần:
- Mở xampp panel dưới quyền admin, start Apache, start MySQL
- Mở command line trong thư mục clone và nhập lệnh
```bash 
cd client
npm install
```
- Tài khoản mặc định của admin là admin1@example.com, mật khẩu 12345678
- Tài khoản mặc định owner là tlqkhanh@gmail.com, mật khẩu 12345678
- Tài khoản mặc định renter là kiwi@gmail.com, mật khẩu 12345678