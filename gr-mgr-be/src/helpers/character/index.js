`
{
	用户
		-添加用户 1
		-删除用户 2

	数据
		-增加数据 1
		-删除数据 2
		-修改数据 3
		-查看数据列表 4

	分析图
		-查看数据分析图 1
}

//	member1 普通成员(访客)
{
	user: [],
	record: [4],
	dchart: [],
}

//	member2 高级成员(学生)
{
	user: [],
	record: [4],
	dchart: [1],
}

//member3 特殊成员(教师)
{
	user: [1],
	record: [1,2,3,4],
	dchart: [1],
}

//admin 管理员
{
	user: [1,2],
	record: [1,2,3,4],
	dchart: [1],
}


-1  无任何权限
0  管理员权限
1  增加权限
2  删除权限
3  修改权限
4  查找权限
5  查看数据图权限
`;

const defaultCharacters = [
  {
    title: '管理员',
    name: 'admin',
    power: {
      record: [0],
      user: [0],
      dchart: [0],
    }, //权限
  },
  {
    title: '普通成员_学生',
    name: 'member1',
    power: {
      record: [1,3],
      user: [-1],
      dchart: [-1],
    },
  },
  {
    title: '高级成员_教师',
    name: 'member2',
    power: {
      record: [1,2,3,4],
      user: [1],
      dchart: [5],
    },
},
];

module.exports = {
  defaultCharacters,
};