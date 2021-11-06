const path = require('path');
const webpack = require('webpack');

module.exports = {
	mode: 'development', // 배포 시에는 production
	devtool: 'eval', // 배포 시에는 hidden-source-map
	resolve: {
		/* 
      웹팩에서 처리해주는 확장자들
      import 시에 확장자 생략할 수 있게 된다.
    */
		extensions: ['.jsx', '.js', '.tsx', '.ts'],
	},
	/*
    엔트리(입력) 설정이다.
    client.tsx 파일을 통해서 app.js를 만들 것이다.
  */
	entry: {
		app: './entry',
	},
	/* 
    위의 엔트리 입력 설정 후,
    모듈 설정을 입혀 출력으로 내보낸다.
  */
	module: {
		rules: [
			{
				test: /\.tsx?$/, // .ts, .tsx 확정자 파일을 만나면
				loader: 'ts-loader', // 해당 로더로 옛날 문법으로 변환하겠다.
			},
		],
	},
	/* 
    모듈 설정을 입히는 것 외에도
    추가적으로 하고 싶은 작업을 기술한다.
  */
	plugins: [],
	/* 
    위의 엔트리 입력과 모듈 및 플러그인을 적용한 작업의 결과물을 기술한다.
  */
	output: {
		filename: 'app.js',
		path: path.join(__dirname, 'dist'),
		publicPath: '/dist',
	},
};
