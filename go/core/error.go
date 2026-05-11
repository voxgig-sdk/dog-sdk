package core

type DogError struct {
	IsDogError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewDogError(code string, msg string, ctx *Context) *DogError {
	return &DogError{
		IsDogError: true,
		Sdk:              "Dog",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *DogError) Error() string {
	return e.Msg
}
