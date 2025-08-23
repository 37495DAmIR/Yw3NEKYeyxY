// 代码生成时间: 2025-08-24 05:58:42
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

// 创建一个Koa实例
const app = new Koa();

// 使用bodyParser中间件解析请求体
app.use(bodyParser());

// 表单验证器
class FormValidator {
    constructor() {
        // 定义验证规则
        this.rules = {
            // 规则可以基于字段名和验证函数进行定义
            // 例如：'username': [this.isRequired, this.isLength(3, 20)]
        };
    }

    // 验证函数：检查是否为空
    isRequired(value) {
        if (value === undefined || value === null || value === '') {
            return 'This field is required';
        }
        return true;
    }

    // 验证函数：检查长度
    isLength(min, max) {
        return (value) => {
            if (value.length < min || value.length > max) {
                return `Length must be between ${min} and ${max}`;
            }
            return true;
        };
    }

    // 验证函数：检查邮箱格式
    isEmail(value) {
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!regex.test(value)) {
            return 'Invalid email format';
        }
        return true;
    }

    // 验证表单数据
    validate(data) {
        const errors = [];
        for (const [field, rules] of Object.entries(this.rules)) {
            for (const rule of rules) {
                const result = rule(data[field]);
                if (result !== true) {
                    errors.push({ field, message: result });
                }
            }
        }
        return errors;
    }
}

// 实例化表单验证器
const validator = new FormValidator();

// 设置验证规则
validator.rules = {
    username: [validator.isRequired, validator.isLength(3, 20)],
    email: [validator.isRequired, validator.isEmail]
};

// 路由处理程序
app.use(async ctx => {
    if (ctx.method === 'POST' && ctx.path === '/validate') {
        try {
            // 获取表单数据
            const formData = ctx.request.body;

            // 使用验证器验证表单数据
            const errors = validator.validate(formData);

            if (errors.length > 0) {
                // 如果有错误，返回错误信息
                ctx.status = 400;
                ctx.body = {
                    success: false,
                    errors
                };
            } else {
                // 如果没有错误，返回成功信息
                ctx.status = 200;
                ctx.body = {
                    success: true,
                    message: 'Form data is valid'
                };
            }
        } catch (error) {
            // 错误处理
            ctx.status = 500;
            ctx.body = {
                success: false,
                message: 'Internal server error'
            };
        }
    } else {
        // 如果请求不是POST或者路径不匹配，返回404
        ctx.status = 404;
        ctx.body = {
            success: false,
            message: 'Not found'
        };
    }
});

// 监听3000端口
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});