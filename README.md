sử dụng xampp để chạy php và mysql cho server, sử dụng react cho client
sau khi clone project về, thực hiện setup theo thứ tự:
* setup apache
- cài đặt xampp (nếu chưa), tắt xampp apache server (nếu đang chạy).
- vào thư mục config của Apache, đường dẫn thường sẽ là C:\xampp\apache\conf (là thư mục bạn chọn để instal xampp), mở file 'httpd.conf' lên
- tìm kiếm dòng 'Listen 80', sau đó thêm dòng 'Listen 9000' ở dưới, port 9000 là sẽ là port tiếp nhận lời gọi api từ client.
- trong file 'httpd.conf', tìm kiếm 'AllowOverride' và tìm đến phần có nội dung như sau (hoặc gần giống vậy):
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

	Thêm vào sau cục ở trên nội dung sau:
<VirtualHost *:4000>
    DocumentRoot "path/to/your/project"
    ServerName localhost

    <Directory "path/to/your/project">
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>

	"path/to/your/project" là đường dẫn đến thư mục clone của project này, ví dụ trên máy mình sẽ là "C:/Users/ADMIN/HK231/Web/BTL/nestseek" (kiểm tra xem bạn có để đúng / hay không)

- lưu lại và khởi động apache từ xampp control panel
- bạn có thể test bằng cách tạo 1 file test.php với nội dung "echo 'Hello World';" trong folder clone của project. Mở trình duyệt bất kì và nhập "localhost:9000/test.php", nếu trình duyệt hiện "Hello World" thì oke, không thì mình cũng chịu =)))))).


* setup mysql: (23/11/2023 vẫn chưa có file data base nên vui lòng sử dụng file data giả trong folder client/src/dummyData và bỏ qua bước setup mysql)
- start MySQL trong xampp, mở trang localhost thông thường và vào mục phpmyadmin, (http://localhost/phpmyadmin/)
- tạo một database mới tên là nestseek, chọn database vừa tạo và nhấn import, sau đó import file "nestseek.sql" trong folder /server/config và import thôi.

* set up client:
- cài nodejs, npm, npx (nếu chưa cài)
- mở command line trong thư mục clone và nhập lệnh "cd client" rồi "npm install"
- chờ đến khi install node_modules xong.

Vậy là đã xong phần setup, để chạy ctr, bạn cần:
- mở xampp panel dưới quyền admin, start Apache, start MySQL
- mở command line trong thư mục clone và nhập lệnh "cd client" (hoặc mở cmd trong thư mục client luôn) và nhập "npm start"
- voila








