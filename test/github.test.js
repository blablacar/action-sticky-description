const github = require('../lib/github')

describe('test updateDescription()', () => {
    test('expect message if body is null', () => {
        expect(github.updateDescription(null, 'Anchor', 'test'))
            .toEqual('\r\n<!-- BEGIN Anchor -->\r\n\r\ntest\r\n\r\n<!-- END Anchor -->')
    })
    test('expect message if body is empty', () => {
        expect(github.updateDescription('', 'Anchor', 'test'))
            .toEqual('\r\n<!-- BEGIN Anchor -->\r\n\r\ntest\r\n\r\n<!-- END Anchor -->')
    })
    test('expect added message', () => {
        expect(github.updateDescription('test1', 'Anchor', 'test2'))
            .toEqual('test1\r\n<!-- BEGIN Anchor -->\r\n\r\ntest2\r\n\r\n<!-- END Anchor -->')
    })
    test('expect updated message', () => {
        expect(github.updateDescription('test1\r\n<!-- BEGIN Anchor -->\r\n\r\ntest2\r\n\r\n<!-- END Anchor -->', 'Anchor', 'test3'))
            .toEqual('test1\r\n<!-- BEGIN Anchor -->\r\n\r\ntest3\r\n\r\n<!-- END Anchor -->')
    })
    test('expect updated message in middle', () => {
        expect(github.updateDescription('test1\r\n<!-- BEGIN Anchor -->\r\n\r\ntest2\r\n\r\n<!-- END Anchor -->\r\ntest9', 'Anchor', 'test3'))
            .toEqual('test1\r\n<!-- BEGIN Anchor -->\r\n\r\ntest3\r\n\r\n<!-- END Anchor -->\r\ntest9')
    })
    test('expect update of moved message', () => {
        expect(github.updateDescription('<!-- BEGIN Anchor -->\r\n\r\ntest1\r\n\r\n<!-- END Anchor -->', 'Anchor', 'test2'))
            .toEqual('\r\n<!-- BEGIN Anchor -->\r\n\r\ntest2\r\n\r\n<!-- END Anchor -->')
    })
})
