// InputArea.js

import React, { useState, useMemo, useRef, useEffect } from 'react'

import './InputArea.scss'

export default function InputArea(props) {
  const [content, setContent] = useState('')

  // 默认textarea的最高行数
  const [defaultMaxRows] = useState(5)

  const [rows, setRows] = useState(1)

  const hiddenTextarea = useRef(null)

  const maxRows = useMemo(() => props.maxRows || defaultMaxRows, [props.maxRows])

  useEffect(() => {
    return () => {
      let r = hiddenTextarea.current.scrollHeight / hiddenTextarea.current.clientHeight
      if (r > maxRows) r = maxRows
      setRows(r)
    }
  }, [maxRows, content])

  // 用户输入内容是否能够发送
  // 去除输入内容的收尾两端空格
  const disable = useMemo(() => content.replace(/(^\s+)|(\s+$)/g, '') === '', [content])

  // 发送消息
  function sendMessage() {
    // 调用接口发送消息
    props.sendMessage && props.sendMessage()

    // 发送成功后
    setContent('')
  }

  function onChange(e) {
    // console.log('onchange', e.target.value)
    setContent(e.target.value)
  }

  function onBlur(e) {
    // 键盘收起
    setTimeout(() => {
      // safari on ios9 一下不支持window.scrollTo 好在这个兼容性问题出如今ios12的微信里
      window.scrollTo && window.scrollTo(0, 99999999)
    }, 100)
  }

  function onFocus(e) {
    // 键盘弹出
    setTimeout(() => {
      // safari on ios9 一下不支持window.scrollTo 好在这个兼容性问题出如今ios12的微信里
      window.scrollTo && window.scrollTo(0, 99999999)
    }, 100)
  }

  return (
    <div className="m-input-area__wrapper">
      <div className="m-input-area__content">
        <textarea
          spellCheck={false}
          placeholder="输入聊天内容..."
          rows={rows}
          value={content}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
        />

        {/* 不可见的输入框 */}
        <textarea readOnly rows={1} value={content} ref={hiddenTextarea} />
      </div>
      <input
        className={`m-input-area__btn ${disable ? 'disable' : ''}`}
        type="button"
        value="发送"
        disabled={disable}
        onClick={sendMessage}
      />
    </div>
  )
}