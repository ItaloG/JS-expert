import DateUtil from '@erickwendel/date-util'

console.log(DateUtil.formatDate(new Date('2021-06-01'), 'dd/mm/yyyy'))
console.log(DateUtil.formatString('2020-02-10', 'yyyy-mm-dd', 'dd-mm-yyyy'))