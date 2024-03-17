import React from "react";
import type { Dayjs } from "dayjs";
import { Calendar } from "antd";
import type { CalendarProps } from "antd";
import { Col, Row } from "react-bootstrap";

function TimeKeeping() {
  return (
    <div className="report spaces px-8 py-12">
      <Row className="spaces mb-12 flex-middle">
        <Col xs={5} xl={6} xxl={7} className="spaces p-0">
          <h2 className="breadcrumb-title">Chấm công</h2>
        </Col>
        <Col xs={7} xl={6} xxl={5} className="flex flex-end">
          <button className="spaces button-primary flex flex-middle" type="button">
            <i className="spaces bi bi-plus fs-20 white"></i>
            <p className="spaces fs-14 m-0 ">Thêm mới</p>
          </button>
        </Col>
      </Row>
      <Row className="bg-white">
        <Calendar />
      </Row>
    </div>
  );
}

export default TimeKeeping;
