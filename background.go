package main

import (
	"image"
	"image/color"
	"image/draw"
)

// We can mess around with the image struct fields directly
func (d *Dots) DrawBackground_Attempt1(img *image.NRGBA) {
	set := func(x, y int, r, g, b, a uint8) {
		start :=
			(y-img.Rect.Min.Y)*img.Stride +
				(x-img.Rect.Min.X)*4
		img.Pix[start] = r
		img.Pix[start+1] = g
		img.Pix[start+2] = b
		img.Pix[start+3] = a
	}

	bounds := img.Bounds()
	for y := bounds.Min.Y; y < bounds.Max.Y; y += 1 {
		for x := bounds.Min.X; x < bounds.Max.X; x += 1 {
			set(x, y, 235, 235, 255, 255)
		}
	}
}

// We can use the Set function of the provided struct, but we have
// to create a "color" to use as an argument for this
func (d *Dots) DrawBackground_Attempt2(img *image.NRGBA) {
	bgColor := color.NRGBA{235, 235, 255, 255}
	bounds := img.Bounds()

	for y := bounds.Min.Y; y < bounds.Max.Y; y += 1 {
		for x := bounds.Min.X; x < bounds.Max.X; x += 1 {
			img.Set(x, y, bgColor)
		}
	}
}

// We can use the draw library's Draw function to compose images, here
// creating a uniform color image and composing it with the entire target
// image.ZP is a "zero" translation argument
// draw.Src is a "simple copy" arguement, vs draw.Over "blending copy"
func (d *Dots) DrawBackground(target draw.Image) {
	bgColor := color.NRGBA{235, 235, 255, 255}
	source := image.NewUniform(bgColor)

	draw.Draw(target, target.Bounds(), source, image.ZP, draw.Src)
}
