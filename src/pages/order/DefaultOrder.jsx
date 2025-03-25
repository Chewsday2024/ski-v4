// 訂單資料 - 初始資料
export const defaultOrder = {
    orderTime: "",
    orderStatus:0,
    userId: 1,
    skiResortId: 0,
    skiResortName: "",          
    coachId: 0,
    coachName: "",
    coachPrice: 0,
    class: {
        skiType: "",             
        timeType: "",
        timeTypeName: "",                     
        date: null,               
        startDate: null,    
        endDate: null,      
        days: 0                     
    },
    studentsData:{
        studentNum: 0,
        skiLevel: 0,
        skiLevelName: "",                
        students: []
    },
    paymentDetail:{
        hours: 0,
        studentNum: 0,
        total: 0
    },
    contactInfo:{
        name: "",
        phone: "",
        email: "",
        lineId: "",
        note: ""
    },
    is_checked: false,
    paymentMethod: 0, 
    isPaid: false
}