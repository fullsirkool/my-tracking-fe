<script setup lang="ts">
</script>
<template>
  <UContainer>
    <div class="guide">
      <h1 class="text-center text-4xl font-bold my-4">{{ $t('guide_title') }}</h1>
      <section>
        <label class="text-xl font-semibold">1. Đăng ký và đăng nhập</label>
        <div>
          <p>- Ở màn Trang chủ, chạm vào biểu tượng “Đăng nhập” để tiến hành đăng nhập vào ứng dụng.</p>
          <div class="guide-img">
            <img src="~/assets/image/guide/image1.png" />
          </div>
          <p>- Người dùng có thể đăng nhập bằng tài khoản Google hiện có (khuyến khích) hoặc tài khoản đã tạo.</p>
          <div class="guide-img">
            <img src="~/assets/image/guide/image16.png" />
          </div>
          <p>- Nếu chưa có tài khoản, người dùng có thể chạm vào nút “Đăng kí ngay” để tiến hành đăng kí tài khoản.</p>
          <div class="md:flex items-start gap-4 justify-center">
            <div class="guide-img">
              <img src="~/assets/image/guide/image9.png" />
            </div>
            <div class="guide-img">
              <img src="~/assets/image/guide/image17.png" />
            </div>
          </div>
        </div>
      </section>
      <section>
        <label class="text-xl font-semibold">2. Đăng ký tham gia hoạt động</label>
        <div>
          <label class="text-lg font-semibold">2.1. Đăng ký cá nhân</label>
          <p>- Truy cập thử thách bạn muốn tham gia</p>
          <p>- Click vào nút “Tham gia thử thách” và chọn hình thức đăng ký cá nhân.</p>
          <div class="guide-img">
            <img src="~/assets/image/guide/image7.png" />
          </div>
          <div class="guide-img">
            <img src="~/assets/image/guide/image2.png" />
          </div>
          <p>- Ở biểu mẫu đăng ký cá nhân, vui lòng điền đầy đủ thông tin và bấm nút Đăng ký để sang bước tiếp theo.</p>
          <div class="guide-img">
            <img src="~/assets/image/guide/image4.png" />
          </div>
          <p>- Bạn vui lòng thanh toán đúng và đủ số tiền để được ghi nhận tham gia..</p>
          <div class="guide-img">
            <img src="~/assets/image/guide/image14.png" />
          </div>
          <p>- Người dùng hoàn tất việc đăng ký tham gia thử thách có thể xem lại thử thách đã tham gia thành công bằng
            cách click vào biểu tượng Avatar -> Thông tin -> chọn Thử thách đã tham gia.</p>
          <div class="guide-img">
            <img src="~/assets/image/guide/image8.png" />
          </div>
        </div>
        <div>
          <label class="text-lg font-semibold">2.2. Đăng ký theo nhóm</label>
          <p>- Khi đăng ký tham gia thử thách, chọn hình thức đăng ký theo nhóm</p>

          <div class="guide-img">
            <img src="~/assets/image/guide/image11.png" />
          </div>
          <p>- Trong biểu mẫu đăng ký nhóm, vui lòng nhập số lượng người tham gia theo từng cự ly.</p>

          <div class="guide-img">
            <img src="~/assets/image/guide/image10.png" />
          </div>
          <p>- Sau khi điền đầy đủ thông tin và chuyển sang bước thanh toán, số tiền thanh toán sẽ tương ứng số vé mua.
            Vui lòng nhập đúng số tiền thanh toán để được ghi nhận thanh toán thành công.</p>
          <div class="guide-img">
            <img src="~/assets/image/guide/image12.png" />
          </div>
          <p>- Sau khi đăng ký thành công, vui lòng vào trang Cá nhân để nhận mã nhóm bằng cách click vào biểu tượng
            avatar ở phía trên màn hình, kéo xuống dưới vào phần “Vé” để xem vé.</p>
          <div class="guide-img">
            <img src="~/assets/image/guide/image13.png" />
          </div>
          <div class="guide-img">
            <img src="~/assets/image/guide/image3.png" />
          </div>
        </div>
        <div>
          <label class="text-lg font-semibold">2.3. Nhận mã và tham gia thử thách theo nhóm</label>
          <p>- Sau khi trưởng nhóm đăng ký vé cho nhóm, từng thành viên nhận mã và tham gia thử thách bằng cách nhập mã
            vẽ vào ô tham gia thử thách.</p>
          <div class="guide-img">
            <img src="~/assets/image/guide/image15.png" />
          </div>
          <p>- Sau khi nhập mã vé, thành viên điền đầy đủ thông tin và bấm hoàn thành đăng ký</p>
          <div class="guide-img">
            <img src="~/assets/image/guide/image5.png" />
          </div>
          <p>- Sau khi đăng ký thành công, người dùng sẽ được xác nhận.</p>
          <div class="guide-img">
            <img src="~/assets/image/guide/image6.png" />
          </div>
        </div>
        <div>
          <label class="text-lg font-semibold">2.4. Thanh toán vé chưa hoàn tất</label>
          <p>- Trong trường hợp VĐV chưa kịp thanh toán vé vừa đăng kí, VĐV có thể truy cập trang cá nhân và tiến hành
            thanh toán nốt vé vừa đăng kí bằng cách truy cập trang Thông tin -> Vé và tiến hành thanh toán nốt vé đăng
            kí.
          </p>
          <div class="guide-img">
            <img src="~/assets/image/guide/image21.png" />
          </div>
          <div class="guide-img">
            <img src="~/assets/image/guide/image20.png" />
          </div>
        </div>
      </section>
    </div>
  </UContainer>
</template>
<style lang="scss">
.guide {
  margin: 20px 0 40px 0;

  .guide-img {
    display: flex;
    justify-content: center;

    img {
      max-height: 60vh;
      margin: 10px 0;
      border: 1px solid gray;
    }
  }

  p, label, div {
    padding: 5px 10px;
  }
}
</style>