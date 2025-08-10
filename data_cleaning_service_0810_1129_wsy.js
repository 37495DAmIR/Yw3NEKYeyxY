// 代码生成时间: 2025-08-10 11:29:06
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const app = new Koa();

// 数据清洗工具类
class DataCleaningService {
    constructor() {
        this.data = {};
    }

    // 清理字符串，去除前后空格
    cleanString(value) {
        return value.trim();
    }

    // 将数字转换为整数
    cleanNumber(value) {
        return parseInt(value, 10);
    }

    // 将布尔值转换为布尔类型
    cleanBoolean(value) {
        return value.toLowerCase() === 'true';
    }

    // 清洗并预处理数据
    processData(data) {
        try {
            this.data = Object.entries(data).reduce((acc, [key, value]) => {
                const cleanValue = Array.isArray(value) ?
                    value.map(this.cleanArrayItem) :
                    this.cleanItem(value);
                acc[key] = cleanValue;
                return acc;
            }, {});
            return this.data;
        } catch (error) {
            throw new Error('Error processing data: ' + error.message);
        }
    }

    // 清洗单个数据项
    cleanItem(value) {
        if (typeof value === 'string') {
            return this.cleanString(value);
        } else if (typeof value === 'number') {
            return this.cleanNumber(value);
        } else if (typeof value === 'boolean') {
            return this.cleanBoolean(value);
        } else {
            return value;
        }
    }

    // 清洗数组中的每个元素
    cleanArrayItem(item) {
        if (typeof item === 'object' && item !== null) {
            return this.processData(item);
        } else {
            return this.cleanItem(item);
        }
    }
}

// 使用bodyParser中间件解析请求体
app.use(bodyParser());

// 处理POST请求，接收数据并进行清洗
app.use(async ctx => {
    if (ctx.method === 'POST' && ctx.path === '/clean-data') {
        try {
            const data = ctx.request.body;
            const cleaningService = new DataCleaningService();
            const cleanedData = cleaningService.processData(data);
            ctx.status = 200;
            ctx.body = {
                success: true,
                data: cleanedData
            };
        } catch (error) {
            ctx.status = 400;
            ctx.body = {
                success: false,
                message: error.message
            };
        }
    } else {
        ctx.status = 404;
        ctx.body = {
            success: false,
            message: 'Not Found'
        };
    }
});

// 监听3000端口
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});