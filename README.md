Libraries:

- API: axios
- Router: react-router-dom
- State management: @reduxjs/toolkit, react-redux
- Form management: react-hook-form

Structure project:

- src/

  - components/

    - Dùng để chứa các UI components, là các component chỉ nhận vào props và dùng local state để hiển thị UI, không chứa các xử lý logic của ứng dụng.
    - VD: button, sidebar, header, footer,...

  - modules/

    - HomeModule: chứa các components cấu thành trang Home (Banner, Showing, Cinema, ...)
    - AuthModule: chứa các components cho tính năng đăng nhập/ đăng ký (Login, Register,...)

    - modules/`<module-name>`/
      - components/: Chứa các components chỉ sử dụng trong module, các components này sẽ có chứa các xử lý logic của ứng dụng (Call API, redux, ...)
      - pages/: Chứa các components cấu thành 1 page hoàn chỉnh (được import và sử dụng bới router)
      - slices/: Chứa các redux slices

  - apis/: Setup axios, và các hàm gọi API

  - hooks/: Chứa các custom hooks

  - store.ts: Setup redux store
