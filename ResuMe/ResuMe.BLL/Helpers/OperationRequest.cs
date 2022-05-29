using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Curriculum.BLL.Helpers
{
    public class OperationRequest
    { 

        private object result;
        public object Result
        {
            get { return result; }
            set
            {
            result = value;
                this.Succeeded = true;
            }
        }
        public string Message { get; set; }
        public bool Succeeded { get; set; }
        public ErrorCode? Code { get; set; }

        public OperationRequest() { }

        public OperationRequest(object result)
        {

            this.Result = result;;
        }

        public OperationRequest(string msg) {

            this.Message = msg;
            this.Succeeded = false;
        }

        public OperationRequest(bool succeeded) {
            this.Succeeded = succeeded;
        }
        public OperationRequest(ErrorCode code)
        {
            this.Code = code;
        }

        public enum ErrorCode
        {
            userNotFound
        }

    }
}
