export default function convertStaffRole(role: string) {
    switch (role) {
      case 'leader':
        return 'Tổng tài'
      case 'gd_admin':
        return 'Trưởng điểm giao dịch'
      case 'tk_admin':
        return 'Trưởng điểm tập kết'
      case 'gd_staff':
        return 'Nhân viên giao dịch'
      case 'tk_staff':
          return 'Nhân viên tập kết'
      default:
        return 'Không xác định'
    }
  }